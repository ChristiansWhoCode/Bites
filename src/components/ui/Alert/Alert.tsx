import "./Alert.scss";
import { type ReactNode } from "react";

export default function Alert({
  children,
  type = "info",
}: {
  children: ReactNode;
  type?: "info" | "success" | "error";
}) {
  return <div className={`ui-alert ui-alert-${type}`}>{children}</div>;
}
