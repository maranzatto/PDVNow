import axios, { type AxiosInstance, type AxiosRequestConfig, type AxiosResponse } from 'axios';
import { useLoadingStore } from '@/stores/loadingStore';

class HttpService {
    private api: AxiosInstance;
    private loadingStore = useLoadingStore();

    constructor() {
        this.api = axios.create({
            baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5173',
            timeout: 10000,
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
            },
        });

        this.setupInterceptors();
    }

    private setupInterceptors() {
        // Request interceptor
        this.api.interceptors.request.use(
            (config) => {
                this.loadingStore.startLoading();
                return config;
            },
            (error) => {
                this.loadingStore.stopLoading();
                return Promise.reject(error);
            }
        );

        // Response interceptor
        this.api.interceptors.response.use(
            (response: AxiosResponse) => {
                this.loadingStore.stopLoading();
                return response;
            },
            (error) => {
                this.loadingStore.stopLoading();
                return Promise.reject(error);
            }
        );
    }

    public getApi(): AxiosInstance {
        return this.api;
    }

    // Métodos HTTP
    public get<T = unknown>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
        return this.api.get(url, config);
    }

    public post<T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
        return this.api.post(url, data, config);
    }

    public put<T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
        return this.api.put(url, data, config);
    }

    public patch<T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
        return this.api.patch(url, data, config);
    }

    public delete<T = unknown>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
        return this.api.delete(url, config);
    }
}

export const httpService = new HttpService();
export default httpService;
