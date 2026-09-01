"use client";

import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import Swal from "sweetalert2";
import SocialBtn from "../buttons/SocialBtn";
import { useEffect } from "react";

export default function LoginForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const session = useSession();
  const callbackUrl = searchParams.get("callbackUrl") || "/";
  const googleLogin = searchParams.get("googleLogin");

  console.log("SESSION:", session);

  // Google Login Success Alert
  useEffect(() => {
    if (googleLogin !== "true") return;

    const showGoogleSuccess = async () => {
      await Swal.fire({
        icon: "success",
        title: "Login Successful!",
        text: "Welcome back!",
        confirmButtonText: "Continue",
      });

      // Remove googleLogin query parameter
      router.replace(callbackUrl);
      router.refresh();
    };

    showGoogleSuccess();
  }, [googleLogin, callbackUrl, router]);

  // Credentials Login
  // const handleLogin = async (e) => {
  //   e.preventDefault();

  //   const email = e.target.email.value;
  //   const password = e.target.password.value;

  //   try {
  //     const result = await signIn("credentials", {
  //       email,
  //       password,
  //       callbackUrl,
  //       redirect: false,
  //     });

  //     if (!result?.ok) {
  //       await Swal.fire({
  //         icon: "error",
  //         title: "Login Failed!",
  //         text: "Email or password is incorrect.",
  //         confirmButtonText: "Continue",
  //       });

  //       return;
  //     }

  //     await Swal.fire({
  //       icon: "success",
  //       title: "Login Successful!",
  //       text: "Welcome to Hero Kidz",
  //       confirmButtonText: "Continue",
  //     });

  //     e.target.reset();

  //     router.replace(result.url || callbackUrl || "/");
  //     router.refresh();
  //   } catch (error) {
  //     console.log("Login Error:", error);

  //     await Swal.fire({
  //       icon: "error",
  //       title: "Error!",
  //       text: error.message || "Something went wrong.",
  //       confirmButtonText: "Continue",
  //     });
  //   }
  // };

  const handleLogin = async (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const result = await signIn("credentials", {
        email,
        password,
        callbackUrl,
        redirect: false,
      });

      if (!result?.ok) {
        await Swal.fire({
          icon: "error",
          title: "Login Failed!",
          text: result?.error || "Email or password is incorrect.",
          confirmButtonText: "Continue",
        });
        return;
      }

      await Swal.fire({
        icon: "success",
        title: "Login Successful!",
        text: "Welcome to Hero Kidz",
        confirmButtonText: "Continue",
      });

      e.target.reset();

      router.replace(result.url || callbackUrl || "/");

      router.refresh();
    } catch (error) {
      console.log("Login Error:", error);
      await Swal.fire({
        icon: "error",
        title: "Error!",
        text: error.message || "Something went wrong.",
        confirmButtonText: "Continue",
      });
    }
  };

  return (
    <main className="min-h-screen bg-base-200 flex items-center justify-center px-4 py-20">
      <div className="card w-full max-w-md bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-3xl justify-center mb-2">
            Welcome Back
          </h2>

          <p className="text-center text-base-content/60 mb-6">
            Login to your account
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
            {/* Email */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>

              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                className="input input-bordered w-full"
                required
              />
            </div>

            {/* Password */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>

              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                className="input input-bordered w-full"
                required
              />

              <Link
                href="#"
                className="label-text-alt link link-primary text-xs"
              >
                Forgot password?
              </Link>
            </div>

            {/* Remember me */}
            <div className="form-control">
              <label className="label cursor-pointer justify-start gap-3">
                <input type="checkbox" className="checkbox checkbox-primary" />

                <span className="label-text">Remember me</span>
              </label>
            </div>

            {/* Login Button */}
            <button type="submit" className="btn btn-primary w-full">
              Login
            </button>
          </form>

          <div className="divider">OR</div>

          <SocialBtn callbackUrl={callbackUrl} />

          {/* Register */}
          <p className="text-center mt-4 text-sm">
            Don&apos;t have an account?{" "}
            <Link
              href={`/register?callbackUrl=${callbackUrl}`}
              className="link link-primary font-medium"
            >
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
