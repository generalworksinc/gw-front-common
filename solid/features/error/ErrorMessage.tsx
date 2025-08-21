/** @jsxImportSource solid-js */
import type { JSX } from "solid-js";

export function ErrorMessage(props: { error?: string | null; class?: string }): JSX.Element | null {
  return props.error ? (
    <div class={"text-red-500 " + (props.class ?? "")}>{props.error}</div>
  ) : null;
}

