"use client";

import { signIn } from "next-auth/react";

import Link from "next/link";

import { useRouter, useSearchParams } from "next/navigation";

import Swal from "sweetalert2";

import { useEffect } from "react";

import { BiEnvelope, BiLockAlt, BiLogIn } from "react-icons/bi";

import SocialBtn from "../buttons/SocialBtn";

export default function LoginForm() {
  const searchParams = useSearchParams();

  const router = useRouter();

  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const googleLogin = searchParams.get("googleLogin");

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

      router.replace(callbackUrl);

      router.refresh();
    };

    showGoogleSuccess();
  }, [googleLogin, callbackUrl, router]);

  // CREDENTIALS LOGIN
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
          text: "Email or password is incorrect. Please try again with valid credentials or register.",
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
    <main className="flex min-h-screen items-center justify-center bg-base-200 px-4 py-12 sm:py-20">
      <div className="card w-full max-w-md border border-base-300 bg-base-100 shadow-xl">
        <div className="card-body p-6 sm:p-8">
          {/* Header */}
          <div className="mb-4 text-center">
            <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-full bg-primary/10">
              <BiLogIn className="text-2xl text-primary" />
            </div>

            <h2 className="text-2xl font-bold sm:text-3xl">Welcome Back</h2>

            <p className="mt-2 text-sm text-base-content/60">
              Login to your account to continue
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-1">
            {/* Email */}
            <fieldset className="fieldset">
              <label className="fieldset-legend">Email</label>

              <label className="input input-bordered flex w-full items-center gap-2">
                <BiEnvelope className="text-lg text-base-content/50" />

                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  className="grow"
                  required
                />
              </label>
            </fieldset>

            {/* Password */}
            <fieldset className="fieldset">
              <label className="fieldset-legend">Password</label>

              <label className="input input-bordered flex w-full items-center gap-2">
                <BiLockAlt className="text-lg text-base-content/50" />

                <input
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  className="grow"
                  required
                />
              </label>
            </fieldset>

            {/* Remember + Forgot */}
            <div className="flex items-center justify-between py-2">
              <label className="flex cursor-pointer items-center gap-2">
                <input
                  type="checkbox"
                  name="remember"
                  className="checkbox checkbox-primary checkbox-sm"
                />

                <span className="text-sm">Remember me</span>
              </label>

              <Link
                href="#"
                className="link link-primary text-xs font-medium no-underline hover:underline"
              >
                Forgot password?
              </Link>
            </div>

            {/* Login Button */}
            <button type="submit" className="btn btn-primary mt-2 w-full">
              <BiLogIn className="text-lg" />
              Login
            </button>
          </form>

          {/* Divider */}
          <div className="divider my-4 text-xs text-base-content/50">
            OR CONTINUE WITH
          </div>

          {/* Social Login */}
          <SocialBtn callbackUrl={callbackUrl} />

          {/* Register */}
          <div className="mt-5 border-t border-base-300 pt-5 text-center">
            <p className="text-sm text-base-content/60">
              Don&apos;t have an account?{" "}
              <Link
                href={`/register?callbackUrl=${callbackUrl}`}
                className="link link-primary font-semibold no-underline hover:underline"
              >
                Create an account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
