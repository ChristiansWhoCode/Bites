import React from "react";
import "./EpisodeCard.scss";

interface EpisodeCardProps {
  title: string;
  thumbnail: string;
  link: string;
}

const EpisodeCard: React.FC<EpisodeCardProps> = ({
  title,
  thumbnail,
  link,
}) => {
  return (
    <div className="episode-card">
      <a href={link} className="episode-card__link">
        <img src={thumbnail} alt={title} className="episode-card__thumbnail" />
        <div className="episode-card__title">{title}</div>
        <div className="episode-card__watch">Watch Now</div>
      </a>
    </div>
  );
};

export default EpisodeCard;
