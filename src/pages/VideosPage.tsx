import { useState, useEffect } from "react";

interface Video {
  id: string;
  title: string;
  thumbnail: string;
  publishedAt: string;
}

function VideoCard({ video }: { video: Video }) {
  const [playing, setPlaying] = useState(false);
  const thumb =
    video.thumbnail || `https://img.youtube.com/vi/${video.id}/hqdefault.jpg`;

  return (
    <div className="video-card">
      {playing ? (
        <iframe
          src={`https://www.youtube.com/embed/${video.id}?autoplay=1`}
          title={video.title}
          frameBorder={0}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      ) : (
        <button
          onClick={() => setPlaying(true)}
          className="yt-thumb-button"
          aria-label={`Play ${video.title}`}
        >
          <img src={thumb} alt={video.title} className="yt-thumb-button__img" />
          <div className="yt-thumb-button__play-icon">
            <div className="yt-thumb-button__play-icon__background">
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="white"
                aria-hidden
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
        </button>
      )}
    </div>
  );
}

const VideosPage = () => {
  const [videos, setVideos] = useState<Video[]>([]);

  useEffect(() => {
    fetch("/api/videos/latest")
      .then((res) => res.json())
      .then(setVideos);
  }, []);

  return (
    <div className="videos-grid">
      {videos.map((video) => (
        <VideoCard key={video.id} video={video} />
      ))}
    </div>
  );
};

export default VideosPage;
