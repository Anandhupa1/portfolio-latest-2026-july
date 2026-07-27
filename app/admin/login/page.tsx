import LoginForm from "@/components/admin/LoginForm";

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-ink px-5 py-16">
      <div className="w-full max-w-md rounded-lg border border-line bg-surface p-6 sm:p-8">
        <p className="mb-2 font-mono text-xs uppercase tracking-[0.18em] text-paperDimmer">
          Admin
        </p>
        <h1 className="font-display text-2xl font-semibold text-paper">
          Sign in
        </h1>
        <p className="mt-2 mb-8 text-sm text-paperDim">
          Verified accounts only. Unverified logins are blocked.
        </p>
        <LoginForm />
      </div>
    </div>
  );
}
