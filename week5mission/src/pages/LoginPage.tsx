import useForm from "../hooks/useForm";
import type { UserSignInformation } from "../utils/validate";
import { validateSignin } from "../utils/validate";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";  // 수정된 부분

const LoginPage = () => {
  const { login, accessToken } = useAuth();
  const navigate = useNavigate();  // 수정된 부분

  useEffect(() => {
    if (accessToken) {
      navigate("/");
    }
  }, [accessToken, navigate]);

  const { values, errors, touched, getInputProps } = useForm<UserSignInformation>({
    initialValue: {
      email: "",
      password: "",
    },
    validate: validateSignin,
  });

  const handleSubmit = async () => {
    await login(values);
  };

  // 구글 로그인 함수
  const handleGoogleLogin = () => {
    window.location.href = `${import.meta.env.VITE_SERVER_API_URL}/auth/google`;
  };

  const isDisabled =
    Object.values(errors || {}).some((error: string) => error.length > 0) ||
    Object.values(values).some((value) => value as string === "");

  return (
    <div className="flex flex-col items-center justify-center h-full gap-4">
      <div className="flex flex-col gap-3">
        <input
          {...getInputProps("email")}
          name="email"
          className={`border w-[300px] p-[10px] focus:border-[#807bff] rounded-sm ${
            errors?.email && touched?.email ? "border-red-500 bg-red-200" : "border-gray-300"
          }`}
          type="email"
          placeholder="이메일"
        />
        {errors?.email && touched.email && (
          <div className="text-red-500 text-sm">{errors.email}</div>
        )}

        <input
          {...getInputProps("password")}
          name="password"
          className={`border w-[300px] p-[10px] focus:border-[#807bff] rounded-sm ${
            errors?.password && touched?.password ? "border-red-500 bg-red-200" : "border-gray-300"
          }`}
          type="password"
          placeholder="비밀번호"
        />
        {errors?.password && touched.password && (
          <div className="text-red-500 text-sm">{errors.password}</div>
        )}

        {/* 일반 로그인 버튼 */}
        <button
          type="button"
          onClick={handleSubmit}
          disabled={isDisabled}
          className={`w-full bg-blue-600 text-white py-3 rounded-md text-lg font-medium hover:bg-blue-700 transition-colors cursor-pointer ${
            isDisabled ? "bg-gray-300 cursor-not-allowed" : ""
          }`}
        >
          로그인
        </button>

        {/* 구글 로그인 버튼 */}
        <button
          type="button"
          onClick={handleGoogleLogin}
          className="w-full bg-red-500 text-white py-3 rounded-md text-lg font-medium hover:bg-red-600 transition-colors cursor-pointer"
        >
          <div className="flex items-center justify-center gap-4">
            <img src="/images/google.svg" alt="Google Logo Image" />
            <span>구글 로그인</span>
          </div>
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
