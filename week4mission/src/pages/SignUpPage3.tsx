import { z } from "zod";
import type { SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";


const schema = z.object({
  name: z.string().min(1, { message: "이름을 입력하세요." }),
});

type FormFields = z.infer<typeof schema>;

const SignUpPage3 = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    defaultValues: {
      name: "",
    },
    resolver: zodResolver(schema),
    mode: "onBlur",
  });

  const onSubmit: SubmitHandler<FormFields> = (data: FormFields) => {
    console.log(data.name);
  };

  return (
    <div className="flex flex-col items-center justify-center h-full gap-4">
      <div className="flex flex-col gap-3">
        <input
          {...register("name")}
          className={`border w-[300px] p-[10px] rounded-sm ${
            errors?.name ? "border-red-500 bg-red-200" : "border-gray-300"
          }`}
          type={"text"}
          placeholder="이름을 입력하세요"
        />
        {errors.name && (
          <div className="text-red-500 text-sm">{errors.name.message}</div>
        )}

        <button
          type="button"
          onClick={handleSubmit(onSubmit)}
          disabled={isSubmitting}
          className="bg-[#807bff] text-white w-[300px] p-[10px] rounded-sm cursor-pointer hover:bg-[#807bff]/80 transition-colors disabled:bg-[#807bff]/50 disabled:cursor-not-allowed"
        >
          가입 완료
        </button>
      </div>
    </div>
  );
};

export default SignUpPage3;