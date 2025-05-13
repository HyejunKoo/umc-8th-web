import axios from "axios";
import type { InternalAxiosRequestConfig, AxiosInstance } from "axios";
import { LOCAL_STORAGE_KEY } from "../constants/key";
import useLocalStorage from "../hooks/useLocalStorage";

interface CustomInternalAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean; // 요청 재시도 여부를 나타내는 플래그
}

// 전역 변수로 refresh 요청의 Promise를 저장해서 중복 요청을 방지한다.
let refreshPromise: Promise<string> | null = null;

export const axiosInstance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_API_URL,
  withCredentials: true,
});

// 요청 인터셉터: 모든 요청 전에 accessToken을 Authorization 헤더에 추가한다.
axiosInstance.interceptors.request.use(
  (config: CustomInternalAxiosRequestConfig) => {
    const { getItem } = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);
    const accessToken = getItem(); // localStorage에서 accessToken을 가져온다.

    // accessToken이 존재하면 Authorization 헤더에 Bearer 토큰 형식으로 추가한다.
    if (accessToken) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    // 수정된 요청 설정을 반환한다.
    return config;
  },
  // 요청 인터셉터가 실패하면, 에러 반환.
  (error) => Promise.reject(error)
);
