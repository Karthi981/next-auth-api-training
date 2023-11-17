import EyefilledIcon from "@/src/components/EyeFilledIcon";
import EyeSlashfilledIcon from "@/src/components/EyeSlashFilledIcon";
import InputField, {
  labelClass,
} from "@/src/components/SharedComponents/InputField";
import MessageError from "@/src/components/SharedComponents/MessageError";
import clsx from "clsx";
import Link from "next/link";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";

const flexContainerClasses = clsx(
  "flex",
  "flex-col",
  "items-center",
  "justify-center",
  "px-6",
  "py-8",
  "mx-auto",
  "md:h-screen",
  "lg:py-0"
);

type FormData = {
  Email: string;
  Password: string;
  PhoneNumber: string;
  acceptTerms: string;
  fullName: string;
};

const SignupPage = () => {
  const [isEmailRenderVisible, setIsEmailRenderVisible] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>();

  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = useCallback(
    () => setIsVisible(!isVisible),
    [isVisible]
  );

  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });
  const emailContainerClasses = clsx({
    block: isEmailRenderVisible,
    "flex flex-row": !isEmailRenderVisible,
  });

  return (
    <div className="bg-orange-300 dark:bg-gray-900 ">
      <div className={flexContainerClasses}>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8 ">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-green-600 md:text-2xl dark:text-white ">
              Create An account
            </h1>
            <form
              onSubmit={onSubmit}
              className="space-y-2 md:space-y-2 lg:space-y-2"
            >
              <div className={emailContainerClasses}>
                {!isEmailRenderVisible && (
                  <div>
                    <label className={labelClass} htmlFor="email">
                      Email
                    </label>
                    <div className="font-semibold block mb-2 px-4">
                      abc@gmail.com
                    </div>
                  </div>
                )}
                {isEmailRenderVisible && (
                  <InputField
                    label="Email"
                    name="Email"
                    register={register}
                    type="email"
                    error={errors.Email?.message}
                  />
                )}
              </div>
              <div className="flex flex-row justify-between">
                <div className="relative w-full">
                  <InputField
                    label="Password"
                    name="Password"
                    register={register}
                    type="password"
                    error={errors.Password?.message}
                    isVisible={isVisible}
                  />
                  <button
                    className="absolute top-1/2 transform -translate-y-1/5 right-2 focus:outline-none"
                    type="button"
                    onClick={toggleVisibility}
                  >
                    {isVisible ? <EyeSlashfilledIcon /> : <EyefilledIcon />}
                  </button>
                </div>
              </div>
              <div className="pt-4">
                <InputField
                  label="FullName"
                  name="fullName"
                  register={register}
                  type="text"
                  error={errors.fullName?.message}
                />
              </div>
              <div>
                <InputField
                  label="Phone Number"
                  name="PhoneNumber"
                  register={register}
                  type="phone"
                  error={errors.PhoneNumber?.message}
                />
              </div>
              <div className="flex items-start pt-2  ">
                <div className="flex items-center h-4">
                  <input
                    type="checkbox"
                    {...register("acceptTerms", {
                      required: "Please accept the terms and conditions",
                    })}
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                  />
                </div>
                <div className="ml-2 text-sm ">
                  <label className="font-light text-gray-800 dark:text-gray-300">
                    I accept the Terms and Conditions
                  </label>
                </div>
              </div>
              <MessageError errorMessage={errors.acceptTerms?.message} />
              <button
                type="submit"
                disabled={
                  !(
                    (isEmailRenderVisible && watch("Email")) ||
                    watch("PhoneNumber") ||
                    watch("Password")
                  )
                }
                className="w-full bg-blue-400 py-2 rounded-xl"
              >
                Create an Account
              </button>

              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Already have an account?{" "}
                <Link
                  href="/SignIn"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500 hover:text-green-500"
                >
                  Sign In here
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
