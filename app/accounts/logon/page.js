"use client";

import { credentialsLogon } from "@/app/actions/accounts";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useEffect, useState } from "react";
import OnlinePlatforms from "../_components/online-platforms";

export default function LogonPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { theme, setTheme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const isLength = password.length >= 8;

  const isDisable = isLength && email;

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const currentTheme = theme === "system" ? systemTheme : theme;

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData(e.target);
      const response = await credentialsLogon(formData);

      if (response?.error) {
        console.error("Login failed:", response.error);
        // You can also show an error toast or alert here
      } else {
        console.log("Login successful");
        // Redirect user or show success message
      }
    } catch (error) {
      console.error("An unexpected error occurred:", error);
      // Handle unexpected errors
    }

    //  try {
    //    const formData = new FormData(e.currentTarget);

    //    const result = await signIn("credentials", {
    //      email: formData.get("email"),
    //      password: formData.get("password"),
    //      redirect: false,
    //    });

    //    if (result?.error) {
    //      console.error("Login page", result.error);
    //      // setError(result.error);
    //      return;
    //    }

    //    const session = await getSession();

    //    const userEmail = session?.user?.email;
    //    const isProve = session?.user?.isProve;

    //    if (userEmail && isProve !== true) {
    //      //   router.push(`/verify-email?email=${userEmail}`);
    //      // Optionally log them out first
    //      await signOut({
    //        callbackUrl: `/awaiting-confirmation?email=${userEmail}`,
    //      });
    //    } else {
    //      //   await getSession(); // Refresh session
    //      router.push("/");
    //    }
    //  } catch (error) {
    //    console.error("Sign-in error:", error);
    //    // setError(error.message || "An unexpected error occurred.");
    //    setLoading(false);
    //  }
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="max-w-md p-8 rounded-2xl border shadow-slate-950">
          <div>
            <h1 className="text-2xl font-bold text-center mb-6 text-green-500">
              Log in to your account
            </h1>
            <p className="text-center mb-4 text-sm">
              Don't have an account?{" "}
              <Link
                href="/accounts/enroll"
                className="text-blue-500 font-medium hover:text-blue-600"
              >
                Sign up now
              </Link>
            </p>
          </div>

          <OnlinePlatforms name="Login" />

          <div className="relative flex items-center mb-6">
            <div className="flex-grow border-t" />
            <span className="px-3 text-sm">Or with email and password</span>
            <div className="flex-grow border-t" />
          </div>

          <form onSubmit={onSubmit}>
            {/* Your email */}
            <div className="relative my-6">
              <input
                id="email"
                type="email"
                name="email"
                placeholder="Your email"
                //  value={state["id-b09"]}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoFocus
                className={`peer relative h-10 w-full rounded border px-4 text-sm text-slate-500 placeholder-transparent outline-none transition-all autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-emerald-500 focus:outline-none invalid:focus:border-pink-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400`}
                //  onChange={handleChange}
              />
              <label
                htmlFor="email"
                className={`${
                  currentTheme === "dark"
                    ? " before:bg-gray-900"
                    : " before:bg-gray-50"
                } absolute left-2 -top-2 z-[1] cursor-text px-2 text-xs transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-autofill:-top-2 peer-required:after:text-pink-500 peer-required:after:content-["*"] peer-invalid:text-pink-500 peer-focus:-top-2 peer-focus:cursor-default peer-focus:text-xs peer-focus:text-emerald-500 peer-invalid:peer-focus:text-pink-500 peer-disabled:cursor-not-allowed peer-disabled:text-slate-400 peer-disabled:before:bg-transparent`}
              >
                Your email
              </label>
            </div>
            {/* Password */}
            <div className="relative mt-6 mb-2">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="peer relative h-10 w-full rounded border px-4 pr-12 text-sm text-slate-500 placeholder-transparent outline-none transition-all autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-emerald-500 focus:outline-none invalid:focus:border-pink-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
                //  onChange={handleChange}
                //  value={state["id-b13"]}
              />
              <label
                htmlFor="password"
                className={`${
                  currentTheme === "dark"
                    ? "before:bg-gray-900"
                    : "before:bg-gray-50"
                } absolute left-2 -top-2 z-[1] cursor-text px-2 text-xs transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-autofill:-top-2 peer-required:after:text-pink-500 peer-required:after:content-['*'] peer-invalid:text-pink-500 peer-focus:-top-2 peer-focus:cursor-default peer-focus:text-xs peer-focus:text-emerald-500 peer-invalid:peer-focus:text-pink-500 peer-disabled:cursor-not-allowed peer-disabled:text-slate-400 peer-disabled:before:bg-transparent`}
              >
                Your password
              </label>
              {showPassword ? (
                <svg
                  onClick={() => setShowPassword(!showPassword)}
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute top-2.5 right-4 h-5 w-5 cursor-pointer stroke-slate-400 peer-disabled:cursor-not-allowed"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  aria-labelledby="title-4 description-4"
                  role="graphics-symbol"
                >
                  <title id="title-4">Check mark icon</title>
                  <desc id="description-4">Icon description here</desc>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              ) : (
                <svg
                  onClick={() => setShowPassword(!showPassword)}
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute top-2.5 right-4 h-5 w-5 cursor-pointer stroke-slate-400 peer-disabled:cursor-not-allowed"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  aria-labelledby="title-4d description-4d"
                  role="graphics-symbol"
                >
                  <title id="title-4d">Check mark icon</title>
                  <desc id="description-4d">Icon description here</desc>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                  />
                </svg>
              )}
            </div>
            <div className="flex justify-end">
              <Link href={"/accounts/forgot-password"}>Forgot Password?</Link>
            </div>
            {/* <div className="relative my-6">
              <input
                id="password-p10"
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="your name"
                //  value={password}
                //  onChange={(e) => setPassword(e.target.value)}
                className="peer relative h-10 w-full border-b px-4 pr-12 text-sm placeholder-transparent outline-none transition-all autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-emerald-500 focus:outline-none invalid:focus:border-pink-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
              />
              <label
                htmlFor="password-p10"
                className="absolute left-2 -top-2 z-[1] cursor-text px-2 text-xs text-slate-400 transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-autofill:-top-2 peer-required:after:text-pink-500 peer-required:after:content-['\00a0*'] peer-invalid:text-pink-500 peer-focus:-top-2 peer-focus:cursor-default peer-focus:text-xs peer-focus:text-emerald-500 peer-invalid:peer-focus:text-pink-500 peer-disabled:cursor-not-allowed peer-disabled:text-slate-400 peer-disabled:before:bg-transparent"
              >
                Your password<span className="text-red-500">*</span>
              </label>
              {showPassword ? (
                <svg
                  onClick={() => setShowPassword(!showPassword)}
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute top-2.5 right-4 h-5 w-5 cursor-pointer stroke-slate-400 peer-disabled:cursor-not-allowed"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  aria-labelledby="title-2 description-2"
                  role="graphics-symbol"
                >
                  <title id="title-2">Check mark icon</title>
                  <desc id="description-2">Icon description here</desc>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              ) : (
                <svg
                  onClick={() => setShowPassword(!showPassword)}
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute top-2.5 right-4 h-5 w-5 cursor-pointer stroke-slate-400 peer-disabled:cursor-not-allowed"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  aria-labelledby="title-2d description-2d"
                  role="graphics-symbol"
                >
                  <title id="title-2d">Check mark icon</title>
                  <desc id="description-2d">Icon description here</desc>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                  />
                </svg>
              )}
              {/* <div className="mt-2 text-sm space-y-1">
                <small
                  className={`flex items-center space-x-2 ${
                    isLength ? "text-blue-600" : "text-gray-500"
                  }`}
                >
                  <span>{isLength ? "✓" : "✗"}</span>
                  <span>
                    Password is required to be at least 8 characters long
                  </span>
                </small>
                <small
                  className={`flex items-center space-x-2 ${
                    lowerCase && upperCase && number
                      ? "text-blue-600"
                      : "text-gray-500"
                  }`}
                >
                  <span>{lowerCase && upperCase && number ? "✓" : "✗"}</span>
                  <span>
                    Use at least one lowercase, one uppercase, and one number
                  </span>
                </small>
              </div> */}
            {/* </div> */}
            {/* Terms */}
            {/* <small className="text-justify text-sm">
              By continuing, you agree to our{" "}
              <Link href="/terms" className="text-blue-500 hover:text-blue-600">
                Terms
              </Link>{" "}
              and acknowledge our{" "}
              <Link
                href="/privacy"
                className="text-blue-500 hover:text-blue-600"
              >
                Privacy Policy
              </Link>
              .
            </small> */}
            <div className="flex justify-center items-center mt-2">
              <button
                type="submit"
                disabled={loading || !isDisable}
                className={`rounded-lg py-2 w-full font-semibold text-white ${
                  loading || !isDisable ? "" : ""
                }`}
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    Login <Spinners />
                  </span>
                ) : (
                  "Login"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
      {/* <AccountCreated
        isOpen={showSuccess}
        onClose={() => setShowSuccess(false)}
        title="Account Created"
        message="You're all set! Just check your email to verify your account, then you’re good to go."
      /> */}
    </>
  );
}
