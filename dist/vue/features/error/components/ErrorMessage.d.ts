import { PropType } from 'vue';
import { ClassLike } from '../../../types';
type FieldProp = {
    validator?: {
        message?: string;
    };
    id?: string;
};
declare const _default: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
    field: PropType<FieldProp>;
    classObj: PropType<ClassLike>;
    id: StringConstructor;
}>, () => import("vue/jsx-runtime").JSX.Element, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
    field: PropType<FieldProp>;
    classObj: PropType<ClassLike>;
    id: StringConstructor;
}>> & Readonly<{}>, {}, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
export default _default;
