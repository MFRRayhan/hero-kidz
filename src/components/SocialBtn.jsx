import { FaGoogle } from "react-icons/fa";

export default function SocialBtn() {
  return (
    <>
      {/* Google Login */}
      <button className="btn btn-outline w-full flex items-center">
        <FaGoogle />
        Continue with Google
      </button>
    </>
  );
}
