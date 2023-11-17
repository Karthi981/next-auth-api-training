import EyefilledIcon from "@/src/components/EyeFilledIcon";
import EyeSlashfilledIcon from "@/src/components/EyeSlashFilledIcon";
import PasswordTooltip from "@/src/components/PasswordTooltip";
import MessageError from "@/src/components/SharedComponents/MessageError";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

type FormData = {
  Email: string;
  Password: string;
};

const SignIn = () => {
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm<FormData>();
  const onSubmit = handleSubmit((data) => {
    console.log(data);
    nextAuthSignIn(data);
  });
  const router = useRouter();
  const nextAuthSignIn = async (data: FormData) => {
    const signInData = await signIn("credentials", {
      email: data.Email,
      password: data.Password,
      callbackUrl: "/AdminPage",
    });
    if (signInData?.error) {
      console.log(signInData.error);
    }
  };
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);
  return (
    <section className="bg-orange-300 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-4 sm:p-8 lg:space-y-4">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-blue-600 md:text-2xl dark:text-white">
              Welcome Back
            </h1>
            <form
              onSubmit={onSubmit}
              className="space-y-4 lg:space-y-4 md:space-y-4"
            >
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-800 dark:text-white">
                  Your email
                </label>
                <input
                  {...register("Email", {
                    required: "Email is required",
                    pattern: {
                      value: /\S+@\S+\.\S+/,
                      message: "Email is Invalid",
                    },
                  })}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
                <MessageError errorMessage={errors.Email?.message} />
              </div>
              <div>
                <div className="flex flex-row">
                  <label className="block mb-2 text-sm font-medium text-gray-800 dark:text-white">
                    Password
                  </label>
                  <div className="px-2">
                    <PasswordTooltip content="At least 8 characters including one Number, Uppercase, and Special Symbol required" />
                  </div>
                </div>
                <div className="flex flex-row justify-between">
                  <div className="relative w-full">
                    <input
                      type={isVisible ? "text" : "password"}
                      {...register("Password", {
                        required: "Password is required",
                        pattern: {
                          value:
                            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                          message:
                            "At least one Number, Uppercase, and Special Symbol required",
                        },
                      })}
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 pr-10"
                    />
                    <button
                      className="absolute top-1/2 transform -translate-y-1/2 right-2 focus:outline-none"
                      type="button"
                      onClick={toggleVisibility}
                    >
                      {isVisible ? <EyeSlashfilledIcon /> : <EyefilledIcon />}
                    </button>
                  </div>
                </div>
                <MessageError errorMessage={errors.Password?.message} />
              </div>
              <div className="flex items-center justify-between pt-2">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="remember"
                      aria-describedby="remember"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label className="text-gray-500 dark:text-gray-300">
                      Remember me
                    </label>
                  </div>
                </div>
                <a
                  href="#"
                  className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Forgot password?
                </a>
              </div>
              <button
                disabled={
                  !watch("Email") ||
                  !watch("Password") ||
                  !!errors.Email ||
                  !!errors.Password
                }
                type="submit"
                className="w-full text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Sign in
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Don’t have an account yet?{" "}
                <Link
                  href="/SignUp"
                  className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                >
                  Sign up
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignIn;
