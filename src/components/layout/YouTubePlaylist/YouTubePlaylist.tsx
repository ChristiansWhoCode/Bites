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
  channelId?: string; // optional prop, fallback to hardcoded
  maxResults?: number;
}

// Example hardcoded channel id (replace with the channel you want)
const DEFAULT_CHANNEL_ID = "UCBM_eR5dTQREkbx1ya8s2Ag"; // Bite-Sized Bible channel

export default function YouTubePlaylists({
  channelId = DEFAULT_CHANNEL_ID,
  maxResults = 4,
}: Props) {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // read API key from Vite env (prefix VITE_)
  const apiKey = import.meta.env.VITE_YOUTUBE_API_KEY as string | "";

  useEffect(() => {
    if (!apiKey) {
      setError("Missing YouTube API key (VITE_YOUTUBE_API_KEY).");
      return;
    }

    let cancelled = false;
    async function load() {
      setLoading(true);
      setError(null);
      try {
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

        // Only keep the requested number of most-recent playlists
        const limited = items.slice(0, Math.max(0, Number(maxResults || 4)));
        if (!cancelled) setPlaylists(limited);
      } catch (e: unknown) {
        if (!cancelled)
          setError((e as Error)?.message || "Failed to load playlists");
      } finally {
        if (!cancelled) setLoading(false);
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
                    src={p.thumbnails.default.url}
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
