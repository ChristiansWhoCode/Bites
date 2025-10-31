import "./Card.scss";
import { type ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  title?: string;
  description?: string;
  backgroundColor?: string;
}

export default function Card({
  children,
  className = "",
  title,
  description,
  backgroundColor,
}: CardProps) {
  const style = backgroundColor ? { backgroundColor } : undefined;
  return (
    <div className={`ui-card ${className}`.trim()} style={style}>
      {title && <h2 className="ui-card-title">{title}</h2>}
      {description && <p className="ui-card-description">{description}</p>}
      {children}
    </div>
  );
}
