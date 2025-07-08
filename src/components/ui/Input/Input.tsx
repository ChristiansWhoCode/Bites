import "./Input.scss";
import { type InputHTMLAttributes } from "react";

export default function Input(props: InputHTMLAttributes<HTMLInputElement>) {
  return <input className="ui-input" {...props} />;
}
