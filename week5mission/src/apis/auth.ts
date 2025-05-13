import axios from "axios";
import type { RequestSigninDto, ResponseMyInfoDto } from "../types/auth";  

// 로그인 API
export const postSignIn = async (signInData: RequestSigninDto): Promise<{ accessToken: string; refreshToken: string }> => {
  try {
    const response = await axios.post("/api/signin", signInData);
    return response.data;
  } catch (error) {
    console.error("Sign-in failed:", error);
    throw new Error("로그인에 실패했습니다.");
  }
};

// 로그아웃 API
export const postLogout = async (): Promise<void> => {
  try {
    await axios.post("/api/logout");
  } catch (error) {
    console.error("Logout failed:", error);
    throw new Error("로그아웃에 실패했습니다.");
  }
};

// 사용자 정보 조회 API
export const getMyInfo = async (): Promise<ResponseMyInfoDto> => {
  try {
    const response = await axios.get<ResponseMyInfoDto>("/api/user");
    return response.data;
  } catch (error) {
    console.error("Failed to fetch user info:", error);
    throw new Error("사용자 정보를 가져오지 못했습니다.");
  }
};
