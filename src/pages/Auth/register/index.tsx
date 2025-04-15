import { useState } from "react";
import { useNavigate } from "react-router";
import { useForm, SubmitHandler } from "react-hook-form";
import TextInput from "../TextInput";
import { toastSuccess } from "~/utilities/constant";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

interface IFormInput {
  username: string;
  email: string;
  password: string;
}

const schema = yup.object({
  username: yup
    .string()
    .required("Username is required")
    .min(6, "User name must be at least 6 characters"),
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/\d/, "Password must contain at least one number")
    .required("Password is required"),
});

export default function Register() {
  const navigate = useNavigate();

  const { handleSubmit, control } = useForm<IFormInput>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    console.log("data", data);
    toastSuccess(`${JSON.stringify(data)}`);
    await navigate("/login");
  };

  return (
    <div className="flex min-h-screen w-full">
      {/* Gradient background */}
      <div className="hidden md:block md:w-1/2 bg-gradient-to-br from-yellow-100 via-purple-200 to-pink-400" />

      {/* Form container */}
      <div className="w-full md:w-1/2 p-8 flex items-center justify-center bg-white">
        <div className="w-full max-w-md space-y-8 ">
          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-black">Create an account</h1>
          </div>

          <form className="space-y-6">
            <TextInput label="User name" name="username" control={control} />
            <TextInput label="Email address" name="email" control={control} />
            <TextInput label="Password" name="password" control={control} />

            <div className="text-sm text-gray-600">
              <p>
                By creating an account, you agree to our
                <a href="#" className="font-medium text-gray-900 ml-1">
                  Terms of use
                </a>
                {""} and
                <a href="#" className="font-medium text-gray-900 ml-1">
                  Privacy Policy
                </a>
              </p>
            </div>

            <button
              onClick={handleSubmit(onSubmit)}
              type="submit"
              className="inline-flex h-12 w-full items-center justify-center rounded-full bg-gray-300 px-4 py-2 text-sm font-medium text-gray-800 transition-colors hover:bg-gray-400 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
            >
              Create an account
            </button>

            <p className="text-center text-sm text-gray-500">
              Already have an account?
              <a href="/login" className="text-gray-900 font-medium">
                Log in
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
