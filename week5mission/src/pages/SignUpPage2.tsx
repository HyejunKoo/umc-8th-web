import { useState } from "react";
import { useLocation } from "react-router-dom";
import { z } from "zod";
import type { SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { useForm } from "react-hook-form";

const schema = z
  .object({
    password: z
      .string()
      .min(8, { message: "비밀번호는 8자 이상이어야 합니다." })
      .max(20, { message: "비밀번호는 20자 이하이어야 합니다." }),
    passwordCheck: z
      .string()
      .min(8, { message: "비밀번호는 8자 이상이어야 합니다." })
      .max(20, { message: "비밀번호는 20자 이하이어야 합니다." }),
  })
  .refine((data) => data.password === data.passwordCheck, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["passwordCheck"],
  });

type FormFields = z.infer<typeof schema>;

const SignUpPage2 = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const emailFromState =
    (location.state && (location.state as { email?: string }).email) || "";

  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordCheck, setShowPasswordCheck] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    defaultValues: {
      password: "",
      passwordCheck: "",
    },
    resolver: zodResolver(schema),
    mode: "onBlur",
  });

  const onSubmit: SubmitHandler<FormFields> = () => {
    navigate("/signup3");
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const togglePasswordCheckVisibility = () =>
    setShowPasswordCheck(!showPasswordCheck);

  return (
    <div className="flex flex-col items-center justify-center h-full gap-4">
      <div className="flex flex-col gap-3">
        <div className="text-gray-700 font-bold">{emailFromState}</div>

        <div className="relative">
          <input
            {...register("password")}
            className={`border w-[300px] p-[10px] rounded-sm ${
              errors?.password ? "border-red-500 bg-red-200" : "border-gray-300"
            }`}
            type={showPassword ? "text" : "password"}
            placeholder="비밀번호를 입력하세요"
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
          >
            {showPassword ? <IoEyeOffOutline /> : <IoEyeOutline />}
          </button>
        </div>
        {errors.password && (
          <div className="text-red-500 text-sm">{errors.password.message}</div>
        )}

        <div className="relative">
          <input
            {...register("passwordCheck")}
            className={`border w-[300px] p-[10px] rounded-sm ${
              errors?.passwordCheck
                ? "border-red-500 bg-red-200"
                : "border-gray-300"
            }`}
            type={showPasswordCheck ? "text" : "password"}
            placeholder="비밀번호를 다시 입력하세요"
          />
          <button
            type="button"
            onClick={togglePasswordCheckVisibility}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
          >
            {showPasswordCheck ? <IoEyeOffOutline /> : <IoEyeOutline />}
          </button>
        </div>
        {errors.passwordCheck && (
          <div className="text-red-500 text-sm">
            {errors.passwordCheck.message}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)}>
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-[#807bff] text-white w-[300px] p-[10px] rounded-sm cursor-pointer hover:bg-[#807bff]/80 transition-colors disabled:bg-[#807bff]/50 disabled:cursor-not-allowed"
          >
            다음
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage2;