import { createContext, useContext, useState } from "react";
import type { PropsWithChildren } from "react";
import type { RequestSigninDto, ResponseMyInfoDto } from "../types/auth";  
import useLocalStorage from "../hooks/useLocalStorage";
import { LOCAL_STORAGE_KEY } from "../constants/key";
import { postLogout, postSignIn, getMyInfo } from "../apis/auth";

interface AuthContextType {
  accessToken: string | null;
  refreshToken: string | null;
  user: ResponseMyInfoDto | null;
  setUser: (user: ResponseMyInfoDto | null) => void;
  login: (signInData: RequestSigninDto) => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({
  accessToken: null,
  refreshToken: null,
  user: null,
  setUser: () => {},
  login: async () => {},
  logout: async () => {},
});

export const AuthProvider = ({ children }: PropsWithChildren<{}>) => {
  const {
    getItem: getAccessTokenFromStorage,
    setItem: setAccessTokenInStorage,
    removeItem: removeAccessTokenFromStorage,
  } = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);

  const {
    getItem: getRefreshTokenFromStorage,
    setItem: setRefreshTokenInStorage,
    removeItem: removeRefreshTokenFromStorage,
  } = useLocalStorage(LOCAL_STORAGE_KEY.refreshToken);

  const [accessToken, setAccessToken] = useState<string | null>(getAccessTokenFromStorage());
  const [refreshToken, setRefreshToken] = useState<string | null>(getRefreshTokenFromStorage());
  const [user, setUser] = useState<ResponseMyInfoDto | null>(null);

  // 로그인 함수
  const login = async (signInData: RequestSigninDto) => {
    try {
      const { accessToken, refreshToken } = await postSignIn(signInData);

      if (accessToken && refreshToken) {
        setAccessToken(accessToken);
        setRefreshToken(refreshToken);

        // LocalStorage에 토큰 저장
        setAccessTokenInStorage(accessToken);
        setRefreshTokenInStorage(refreshToken);

        // 사용자 정보 가져오기
        const userInfo = await getMyInfo();
        setUser(userInfo);

        alert("로그인 성공");
        window.location.href = "/protected/mypage";
      }
    } catch (error) {
      console.error("로그인 오류:", error);
      alert("로그인 실패");
    }
  };

  // 로그아웃 함수
  const logout = async () => {
    try {
      await postLogout();

      // 토큰 제거
      removeAccessTokenFromStorage();
      removeRefreshTokenFromStorage();

      setAccessToken(null);
      setRefreshToken(null);
      setUser(null);

      alert("로그아웃 성공");
      window.location.href = "/";
    } catch (error) {
      console.error("로그아웃 오류:", error);
      alert("로그아웃 실패");
    }
  };

  return (
    <AuthContext.Provider value={{ accessToken, refreshToken, user, setUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("AuthContext를 찾을 수 없습니다.");
  }
  return context;
};
