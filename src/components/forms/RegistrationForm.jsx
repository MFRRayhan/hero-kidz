"use client";
import { postUser } from "@/actions/server/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import SocialBtn from "../SocialBtn";

export default function RegistrationForm() {
  const router = useRouter();
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

    if (result.success) {
      Swal.fire({
        icon: "success",
        title: "Registration Successful!",
        text: result.message,
        confirmButtonText: "Continue",
      });

      e.target.reset();
      router.push("/login");
    } else {
      Swal.fire({
        icon: "error",
        title: "Registration failed!",
        text: result.message,
      });
    }
  };

  return (
    <main className="min-h-screen bg-base-200 flex items-center justify-center px-4 py-20">
      <div className="card w-full max-w-md bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="text-3xl font-bold text-center">Create an Account</h2>

          <p className="text-center text-base-content/60 mb-6">
            Sign up to get started
          </p>

          <form onSubmit={handleRegistration} className="space-y-4">
            {/* Name */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>

              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                className="input input-bordered w-full"
                required
              />
            </div>

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
                placeholder="Create a password"
                className="input input-bordered w-full"
                required
              />
            </div>

            {/* Terms */}
            <label className="label cursor-pointer justify-start gap-3">
              <input
                type="checkbox"
                className="checkbox checkbox-primary"
                required
              />

              <span className="label-text">
                I agree to the Terms & Conditions
              </span>
            </label>

            {/* Register Button */}
            <button type="submit" className="btn btn-primary w-full">
              Create Account
            </button>
          </form>

          <div className="divider">OR</div>

          {/* Google */}
          <SocialBtn />

          {/* Login */}
          <p className="text-center text-sm mt-4">
            Already have an account?{" "}
            <Link href="/login" className="link link-primary font-semibold">
              Login
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
