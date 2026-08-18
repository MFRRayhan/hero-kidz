import Logo from "@/components/Logo";

export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4">
      <div className="loading loading-spinner loading-lg text-primary"></div>

      <div className="animate-ping">
        <Logo />
      </div>
    </div>
  );
}
