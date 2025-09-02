// Nuxt types shim for library typecheck (not required at runtime by consumers)
declare module 'nuxt/app' {
	// minimal shape to satisfy defineNuxtPlugin import
	export function defineNuxtPlugin(cb: (nuxtApp: any) => void): any;
}

declare module '@nuxt/kit' {
	export function defineNuxtModule<_T = any>(opts: any): any;
	export function addPlugin(path: string): void;
	export function createResolver(url: string): {
		resolve: (p: string) => string;
	};
}

// Shared Vue-layer types
export type ClassLike =
	| string
	| Record<string, boolean>
	| Array<string | Record<string, boolean>>;
export type StyleLike = string | Record<string, string | number>;

// Common PropType for class-like attributes (string | object | array)
import type { PropType } from 'vue';
export const classLikeProp = [
	String,
	Object,
	Array,
] as unknown as PropType<ClassLike>;
export const styleLikeProp = [String, Object] as unknown as PropType<StyleLike>;
