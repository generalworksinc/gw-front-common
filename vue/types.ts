// Shared Vue-layer types
export type ClassLike =
	| string
	| Record<string, boolean>
	| Array<string | Record<string, boolean>>;

export type StyleLike = string | Record<string, string | number>;

// Common PropType for class-like / style-like attributes
import type { PropType } from 'vue';
export const classLikeProp = [
	String,
	Object,
	Array,
] as unknown as PropType<ClassLike>;
export const styleLikeProp = [String, Object] as unknown as PropType<StyleLike>;
