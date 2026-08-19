"use client";
import { signIn } from "next-auth/react";
import Link from "next/link";

export default function LoginForm() {
  const handleLogin = async (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    console.log("LOGIN:", result);
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

          {/* Google Login */}
          <button className="btn btn-outline w-full">
            Continue with Google
          </button>

          {/* Register */}
          <p className="text-center mt-4 text-sm">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="link link-primary font-medium">
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
