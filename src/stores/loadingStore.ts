import { defineStore } from 'pinia';

interface LoadingState {
    isLoading: boolean;
    requests: number;
}

export const useLoadingStore = defineStore('loading', {
    state: (): LoadingState => ({
        isLoading: false,
        requests: 0,
    }),

    getters: {
        hasActiveRequests: (state) => state.requests > 0,
    },

    actions: {
        startLoading() {
            this.requests++;
            this.isLoading = true;
        },

        stopLoading() {
            this.requests = Math.max(0, this.requests - 1);
            if (this.requests === 0) {
                this.isLoading = false;
            }
        },

        resetLoading() {
            this.requests = 0;
            this.isLoading = false;
        },
    },
});
