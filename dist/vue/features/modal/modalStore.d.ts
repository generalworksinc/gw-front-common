import { ComputedRef } from 'vue';
type ModalFn = (() => void) | null;
export type ModalState = {
    isOpen: boolean;
    isConfirm: boolean;
    html: string;
    message: string;
    height: string;
    width: string;
    maxHeight: string;
    maxWidth: string;
    minHeight: string;
    minWidth: string;
    isScrollY: boolean;
    isScrollX: boolean;
    yesFunc: ModalFn;
    noFunc: ModalFn;
};
export declare function useModal(): {
    readonly state: ComputedRef<ModalState>;
    readonly open: (options?: Partial<ModalState>) => void;
    readonly confirm: (options?: Partial<ModalState>) => void;
    readonly close: () => void;
    readonly yes: () => void;
    readonly no: () => void;
    readonly reset: () => void;
};
export {};
