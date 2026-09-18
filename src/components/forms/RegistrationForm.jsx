"use client";

import { postUser } from "@/actions/server/auth";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import Swal from "sweetalert2";
import SocialBtn from "../buttons/SocialBtn";
import { signIn } from "next-auth/react";

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
    <main className="min-h-screen bg-base-200 flex items-center justify-center px-4 py-20">
      <div className="card w-full max-w-md bg-base-100 shadow-xl">
        <div className="card-body">
          {/* Heading */}
          <h2 className="card-title text-3xl justify-center">
            Create an Account
          </h2>

          <p className="text-center text-base-content/60">
            Sign up to get started
          </p>

          <form onSubmit={handleRegistration} className="space-y-2">
            {/* Name */}
            <fieldset className="fieldset">
              <label className="fieldset-legend">Name</label>

              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                className="input input-bordered w-full rounded-full border-2"
                required
              />
            </fieldset>

            {/* Email */}
            <fieldset className="fieldset">
              <label className="fieldset-legend">Email</label>

              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                className="input input-bordered w-full rounded-full border-2"
                required
              />
            </fieldset>

            {/* Password */}
            <fieldset className="fieldset">
              <label className="fieldset-legend">Password</label>

              <input
                type="password"
                name="password"
                placeholder="Create a password"
                className="input input-bordered w-full rounded-full border-2"
                required
              />
            </fieldset>

            {/* Terms & Conditions */}
            <label className="label cursor-pointer justify-start gap-3">
              <input
                type="checkbox"
                name="terms"
                className="checkbox checkbox-primary"
                required
              />

              <span className="label-text">
                I agree to the Terms & Conditions
              </span>
            </label>

            {/* Register Button */}
            <button
              type="submit"
              className="btn btn-primary w-full rounded-full"
            >
              Create Account
            </button>
          </form>

          {/* Divider */}
          <div className="divider">OR</div>

          {/* Google Login */}
          <SocialBtn callbackUrl={callbackUrl} />

          {/* Login */}
          <p className="text-center mt-4 text-sm">
            Already have an account?{" "}
            <Link
              href={`/login?callbackUrl=${callbackUrl}`}
              className="link link-primary font-medium"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
