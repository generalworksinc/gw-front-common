import { Ref } from 'vue';
export interface LoadingStore {
    isLoading: Ref<boolean>;
    setLoading: (loading: boolean) => void;
    startLoading: () => void;
    stopLoading: () => void;
}
export declare function useLoading(): LoadingStore;
