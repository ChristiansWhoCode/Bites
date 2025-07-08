import { useState, useEffect } from "react";

interface Video {
  id: string;
  title: string;
  thumbnail: string;
  publishedAt: string;
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
        <div key={video.id} className="video-card">
          <iframe
            src={`https://www.youtube.com/embed/${video.id}`}
            title={video.title}
          />
        </div>
      ))}
    </div>
  );
};

export default VideosPage;
