import { PropType } from 'vue';
type FieldProp = {
    validator?: {
        message?: string;
    };
    id?: string;
};
declare const _default: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
    field: PropType<FieldProp>;
    classObj: PropType<import('../../../types').ClassLike>;
    id: StringConstructor;
}>, () => import("vue/jsx-runtime").JSX.Element, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
    field: PropType<FieldProp>;
    classObj: PropType<import('../../../types').ClassLike>;
    id: StringConstructor;
}>> & Readonly<{}>, {}, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
export default _default;
