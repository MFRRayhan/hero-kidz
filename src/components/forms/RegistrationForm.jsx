"use client";
export default function RegistrationForm() {
  return (
    <main className="min-h-screen bg-base-200 flex items-center justify-center px-4 py-20">
      <div className="card w-full max-w-md bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="text-3xl font-bold text-center">Create an Account</h2>

          <p className="text-center text-base-content/60 mb-6">
            Sign up to get started
          </p>

          <form className="space-y-4">
            {/* Name */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>

              <input
                type="text"
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
          <button className="btn btn-outline w-full">
            Continue with Google
          </button>

          {/* Login */}
          <p className="text-center text-sm mt-4">
            Already have an account?{" "}
            <a href="/login" className="link link-primary font-semibold">
              Login
            </a>
          </p>
        </div>
      </div>
    </main>
  );
}
