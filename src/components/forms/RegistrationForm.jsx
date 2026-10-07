"use client";

import { postUser } from "@/actions/server/auth";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

import Swal from "sweetalert2";
import SocialBtn from "../buttons/SocialBtn";

import { signIn } from "next-auth/react";

import { BiEnvelope, BiLockAlt, BiUser, BiUserPlus } from "react-icons/bi";

export default function RegistrationForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const handleRegistration = async (e) => {
    e.preventDefault();

    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    const payload = {
      name,
      email,
      password,
    };

    const result = await postUser(payload);

    if (!result.success) {
      Swal.fire({
        icon: "error",
        title: "Registration failed!",
        text: result.message,
        confirmButtonText: "Try Again",
      });

      return;
    }

    const res = await signIn("credentials", {
      name,
      email,
      password,
      callbackUrl,
      redirect: false,
    });

    if (!res?.ok) {
      Swal.fire({
        icon: "error",
        title: "Login failed!",
        text: res?.error || "Account created, but automatic login failed.",
        confirmButtonText: "Continue",
      });

      return;
    }

    await Swal.fire({
      icon: "success",
      title: "Registration Successful!",
      text: result.message,
      confirmButtonText: "Continue",
    });

    e.target.reset();

    router.replace(callbackUrl);
    router.refresh();
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-base-200 px-4 py-12 sm:py-20">
      <div className="card w-full max-w-md border border-base-300 bg-base-100 shadow-xl">
        <div className="card-body p-6 sm:p-8">
          {/* Header */}
          <div className="mb-4 text-center">
            <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-full bg-primary/10">
              <BiUserPlus className="text-2xl text-primary" />
            </div>

            <h2 className="text-2xl font-bold sm:text-3xl">
              Create an Account
            </h2>

            <p className="mt-2 text-sm text-base-content/60">
              Sign up to get started
            </p>
          </div>

          {/* Registration Form */}
          <form onSubmit={handleRegistration} className="space-y-1">
            {/* Name */}
            <fieldset className="fieldset">
              <label className="fieldset-legend">Name</label>

              <label className="input input-bordered flex w-full items-center gap-2">
                <BiUser className="text-lg text-base-content/50" />

                <input
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                  className="grow"
                  required
                />
              </label>
            </fieldset>

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
                  placeholder="Create a password"
                  className="grow"
                  required
                />
              </label>
            </fieldset>

            {/* Terms & Conditions */}
            <label className="flex cursor-pointer items-center gap-2 py-2">
              <input
                type="checkbox"
                name="terms"
                className="checkbox checkbox-primary checkbox-sm"
                required
              />

              <span className="text-sm text-base-content/70">
                I agree to the Terms & Conditions
              </span>
            </label>

            {/* Register Button */}
            <button type="submit" className="btn btn-primary mt-2 w-full">
              <BiUserPlus className="text-lg" />
              Create Account
            </button>
          </form>

          {/* Divider */}
          <div className="divider my-4 text-xs text-base-content/50">
            OR CONTINUE WITH
          </div>

          {/* Social Login */}
          <SocialBtn callbackUrl={callbackUrl} />

          {/* Login */}
          <div className="mt-5 border-t border-base-300 pt-5 text-center">
            <p className="text-sm text-base-content/60">
              Already have an account?{" "}
              <Link
                href={`/login?callbackUrl=${callbackUrl}`}
                className="link link-primary font-semibold no-underline hover:underline"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
