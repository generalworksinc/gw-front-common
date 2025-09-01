// Shared Vue-layer types
export type RefLike<T> = { value: T };
export type ClassLike =
	| string
	| Record<string, boolean>
	| Array<string | Record<string, boolean>>;
