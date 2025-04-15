import * as yup from "yup";
import BgLogin from "~/assets/image/image-screen-login.jpeg";
import TextInput from "../TextInput";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object({
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

interface IFormInput {
  email: string;
  password: string;
}

const LoginScreen = () => {
  const { handleSubmit, control } = useForm<IFormInput>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log("data", data);
  };
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-white">
      {/* Left section with image */}
      <div className="md:w-1/2 relative hidden md:flex items-center justify-center">
        <img
          src={BgLogin}
          draggable="false"
          alt="Design with us"
          className="absolute inset-0 w-full h-full object-cover opacity-80"
        />
        <div className="relative z-10 text-white p-10 max-w-sm">
          <div className="w-4 h-4 bg-white rounded-full mb-4"></div>
          <h1 className="text-3xl font-bold mb-4">Welcome to Gedeon</h1>
          <p className="text-sm">
            "Success is not final, failure is not fatal: It is the courage to
            continue that counts." - Winston Churchill
          </p>
        </div>
      </div>

      {/* Right section - Form */}
      <div className="md:w-1/2 w-full flex flex-col justify-center items-center px-6 sm:px-12 py-12 bg-white">
        <div className=" w-full max-w-md">
          <h2 className="text-2xl font-semibold mb-6 text-black">Sign in</h2>

          <form className="flex flex-col gap-4">
            <TextInput
              label="User name or email address"
              name="email"
              control={control}
            />
            <TextInput
              label="Your password"
              name="password"
              control={control}
            />
            <div className="text-right text-sm">
              <a href="#" className="text-blue-500 hover:underline">
                Forget your password
              </a>
            </div>

            <button
              onClick={handleSubmit(onSubmit)}
              type="submit"
              className="bg-gray-300 text-white py-2 rounded-md mt-2 hover:bg-gray-400 transition"
            >
              Sign in
            </button>
          </form>

          <div className="flex items-center my-4">
            <hr className="flex-grow border-gray-300" />
            <span className="mx-2 text-gray-400">OR</span>
            <hr className="flex-grow border-gray-300" />
          </div>

          <div className="flex flex-col gap-4 mb-6">
            <button className=" font-normal text-gray-500 border-gray-300 flex items-center justify-center gap-2 border rounded-full py-2 hover:bg-gray-100">
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="Google"
                className="w-5 h-5"
              />
              Continue with Google
            </button>
          </div>

          <div className="mt-6 text-sm text-black">
            Don’t have an account?
            <a href="/register" className="text-blue-500 hover:underline">
              Sign up
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
