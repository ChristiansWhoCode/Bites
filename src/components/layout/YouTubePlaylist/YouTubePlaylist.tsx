import { useEffect, useState } from "react";
import "./YouTubePlaylist.scss";

interface Playlist {
  id: string;
  title: string;
  description?: string;
  thumbnails?: { [k: string]: { url: string } };
}

// Types for the YouTube API response (minimal fields we use)
interface YouTubeSnippet {
  title: string;
  description?: string;
  thumbnails?: { [k: string]: { url: string } };
}

interface YouTubePlaylistItem {
  id: string;
  snippet?: YouTubeSnippet;
}

interface YouTubePlaylistsResponse {
  items?: YouTubePlaylistItem[];
}

interface Props {
  channelId?: string;
  maxResults?: number;
}

const DEFAULT_CHANNEL_ID = "UCBM_eR5dTQREkbx1ya8s2Ag";

export default function YouTubePlaylists({
  channelId = DEFAULT_CHANNEL_ID,
  maxResults = 4,
}: Props) {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Get API key with fallback logic
  const getApiKey = (): string | "" => {
    console.log("All Vite env vars:", import.meta.env);

    let key = import.meta.env.VITE_YOUTUBE_API_KEY as string | "";

    if (key) {
      console.log("✓ Found VITE_YOUTUBE_API_KEY");
      return key;
    }

    console.log("✗ VITE_YOUTUBE_API_KEY not found, trying YOUTUBE_API_KEY...");
    key = import.meta.env.YOUTUBE_API_KEY as string | "";

    if (key) {
      console.log("✓ Found YOUTUBE_API_KEY");
    } else {
      console.log("✗ YOUTUBE_API_KEY not found either");
    }

    return key;
  };

  const apiKey = getApiKey();

  useEffect(() => {
    if (!apiKey) {
      setError("Missing YouTube API key");
      return;
    }

    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(null);

      try {
        console.log(
          "Fetching playlists with API key:",
          apiKey?.substring(0, 10) + "..."
        );

        const url = new URL("https://www.googleapis.com/youtube/v3/playlists");
        url.searchParams.set("part", "snippet");
        url.searchParams.set("channelId", channelId);
        url.searchParams.set("maxResults", String(maxResults));
        url.searchParams.set("key", apiKey);

        const res = await fetch(url.toString());

        if (!res.ok) {
          const d = await res.json().catch(() => ({}));
          throw new Error(d.error?.message || `HTTP ${res.status}`);
        }

        const data = (await res.json()) as YouTubePlaylistsResponse;
        const items = (data.items || []).map((it: YouTubePlaylistItem) => ({
          id: it.id,
          title: it.snippet?.title ?? "",
          description: it.snippet?.description,
          thumbnails: it.snippet?.thumbnails,
        }));

        const limited = items.slice(0, Math.max(0, Number(maxResults || 4)));

        if (!cancelled) {
          console.log("Successfully loaded", limited.length, "playlists");
          setPlaylists(limited);
        }
      } catch (e: unknown) {
        console.error("Failed to load playlists:", e);
        if (!cancelled) {
          setError((e as Error)?.message || "Failed to load playlists");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, [channelId, maxResults, apiKey]);

  if (error) return <div className="yt-playlists-error">Error: {error}</div>;
  if (loading)
    return <div className="yt-playlists-loading">Loading playlists…</div>;

  return (
    <div className="yt-playlists">
      {playlists.length === 0 ? (
        <div>No playlists found.</div>
      ) : (
        <ul className="yt-playlists__list">
          {playlists.map((p) => (
            <li key={p.id} className="yt-playlists__item">
              {p.thumbnails?.default?.url && (
                <a
                  className="yt-playlists__link"
                  href={`https://www.youtube.com/playlist?list=${p.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={p.title || `YouTube playlist`}
                >
                  <img
                    className="yt-playlists__thumb"
                    src={p?.thumbnails?.default.url}
                    alt={
                      p.title
                        ? `${p.title} playlist thumbnail`
                        : `Playlist thumbnail`
                    }
                  />
                </a>
              )}
            </li>
          ))}
        </ul>
      )}
      <a
        className="yt-playlists__see-all"
        href={`https://www.youtube.com/channel/${channelId}/playlists`}
        target="_blank"
        rel="noopener noreferrer"
      >
        See All Series
      </a>
    </div>
  );
}
