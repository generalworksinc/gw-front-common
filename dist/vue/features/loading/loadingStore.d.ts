import { RefLike } from '../../types';
export interface LoadingStore {
    isLoading: RefLike<boolean>;
    setLoading: (loading: boolean) => void;
    startLoading: () => void;
    stopLoading: () => void;
}
export declare function useLoading(): LoadingStore;
