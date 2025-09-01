import { PropType } from 'vue';
export type ClassLike = string | Record<string, boolean> | Array<string | Record<string, boolean>>;
export type StyleLike = string | Record<string, string | number>;
export declare const classLikeProp: PropType<ClassLike>;
export declare const styleLikeProp: PropType<StyleLike>;
