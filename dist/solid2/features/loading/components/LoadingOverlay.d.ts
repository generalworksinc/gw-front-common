import { JSX } from '@solidjs/web';
import { LoadingStore } from '../loadingStore';
export interface LoadingOverlayProps {
    store: LoadingStore;
}
/** @deprecated Use LoadingOverlayProps instead. */
export type LoadingProps = LoadingOverlayProps;
export declare function LoadingOverlay(props: LoadingOverlayProps): JSX.Element;
