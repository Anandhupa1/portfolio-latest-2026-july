import RegisterForm from "@/components/admin/RegisterForm";

export default function AdminRegisterPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-ink px-5 py-16">
      <div className="w-full max-w-md rounded-lg border border-line bg-surface p-6 sm:p-8">
        <p className="mb-2 font-mono text-xs uppercase tracking-[0.18em] text-paperDimmer">
          Admin
        </p>
        <h1 className="font-display text-2xl font-semibold text-paper">
          Create account
        </h1>
        <p className="mt-2 mb-8 text-sm text-paperDim">
          After registering, set{" "}
          <code className="text-signal">isVerified: true</code> on the user in
          MongoDB to unlock sign-in.
        </p>
        <RegisterForm />
      </div>
    </div>
  );
}
