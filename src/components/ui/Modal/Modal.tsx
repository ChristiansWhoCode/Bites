import "./Modal.scss";
import { type ReactNode } from "react";

export default function Modal({
  children,
  open,
}: {
  children: ReactNode;
  open: boolean;
}) {
  if (!open) return null;
  return (
    <div className="ui-modal-backdrop">
      <div className="ui-modal-content">{children}</div>
    </div>
  );
}
