import axios, { type AxiosInstance, type AxiosRequestConfig } from "axios";

const axiosInstance: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            window.location.href = "/login";
        }
        return Promise.reject(error);
    }
);

// Exportação para o Orval usar como mutator
export const api = <T>(config: AxiosRequestConfig): Promise<T> => {
    return axiosInstance.request<T>(config).then(({ data }) => data);
};

// Exportação padrão da instância do axios
export default axiosInstance;
