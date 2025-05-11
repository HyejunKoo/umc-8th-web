import useForm from "../hooks/useForm";
import type { UserSignInformation } from "../utils/validate";
import { validateSignin } from "../utils/validate";


const LoginPage = () => {
  const { values, errors, touched, getInputProps } =
    useForm<UserSignInformation>({
      initialValue: {
        email: "",
        password: "",
      },
      validate: validateSignin,
    });

  const handleSumit = () => {
    console.log(values);
  };

  const isDisabled =
    Object.values(errors || {}).some((error:string) => error.length > 0) ||
    Object.values(values).some((value) => value as string === "");

  return (
    <div className="flex flex-col items-center justify-center h-full gap-4">
      <div className="flex flex-col gap-3">
        <input
          {...getInputProps("email")}
          name="email"
          className={`border border-[#ccc] w-[300px] p-[10px] focus:border-[#807bff] rounded-sm ${
            errors?.email && touched?.email
              ? "border-red-500 bg-red-200"
              : "border-gray-300"
          }`}
          type={"email"}
          placeholder={"이메일"}
        />
        {errors?.email && touched.email && (
          <div className="text-red-500 text-sm">{errors.email}</div>
        )}
        <input
          {...getInputProps("password")}
          className={`border border-[#ccc] w-[300px] p-[10px] focus:border-[#807bff] rounded-sm ${
            errors?.password && touched?.password
              ? "border-red-500 bg-red-200"
              : "border-gray-300"
          }`}
          type={"password"}
          placeholder={"비밀번호"}
        />
        {errors?.password && touched.password && (
          <div className="text-red-500 text-sm">{errors.password}</div>
        )}
        <button
          type="button"
          onClick={handleSumit}
          disabled={false}
          className="w-full bg-blue-600 text-white w-[300px] p-[10px] rounded-sm cursor-pointer hover:bg-blue-700 transition-colors disabled:bg-[#807bff]/50 disabled:cursor-not-allowed"
        >
          로그인
        </button>
      </div>
    </div>
  );
};

export default LoginPage;