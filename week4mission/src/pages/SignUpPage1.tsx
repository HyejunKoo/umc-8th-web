import { z } from "zod";
import type { SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";


const schema = z.object({
  email: z.string().email({ message: "올바른 이메일 형식이 아닙니다." }),
});

type FormFields = z.infer<typeof schema>;

const SignUpPage1 = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    defaultValues: {
      email: "",
    },
    resolver: zodResolver(schema),
    mode: "onBlur",
  });

  const onSubmit: SubmitHandler<FormFields> = (data: FormFields) => {
    navigate("/signup2", { state: { email: data.email } });
  };

  return (
    <div className="flex flex-col items-center justify-center h-full gap-4">
      <div className="flex flex-col gap-3">
        <input
          {...register("email")}
          className={`border border-[#ccc] w-[300px] p-[10px] focus:border-[#807bff] rounded-sm ${
            errors?.email ? "border-red-500 bg-red-200" : "border-gray-300"
          }`}
          type="email"
          placeholder="이메일을 입력하세요"
        />
        {errors.email && (
          <div className="text-red-500 text-sm">{errors.email.message}</div>
        )}

        <button
          type="button"
          onClick={handleSubmit(onSubmit)}
          disabled={isSubmitting}
          className="bg-[#807bff] text-white w-[300px] p-[10px] rounded-sm cursor-pointer hover:bg-[#807bff]/80 transition-colors disabled:bg-[#807bff]/50 disabled:cursor-not-allowed"
        >
          다음
        </button>
      </div>
    </div>
  );
};

export default SignUpPage1;