import "./Card.scss";
import { type ReactNode } from "react";

export default function Card({ children }: { children: ReactNode }) {
  return <div className="ui-card">{children}</div>;
}
