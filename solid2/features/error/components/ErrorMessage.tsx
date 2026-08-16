import type { JSX } from '@solidjs/web';

export function ErrorMessage(props: {
	error?: string | null;
	class?: string;
}): JSX.Element | null {
	return props.error ? (
		<div class={`text-red-500 ${props.class ?? ''}`}>{props.error}</div>
	) : null;
}
