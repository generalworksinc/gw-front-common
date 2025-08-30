import { RefLike } from '../../types';
declare const defaultState: () => {
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
    yesFunc: any;
    noFunc: any;
};
export declare function useModal(): Readonly<{
    state: RefLike<ReturnType<typeof defaultState>>;
    open: (options?: Partial<ReturnType<typeof defaultState>>) => void;
    confirm: (options?: Partial<ReturnType<typeof defaultState>>) => void;
    close: () => void;
    yes: () => void;
    no: () => void;
    reset: () => void;
}>;
export {};
