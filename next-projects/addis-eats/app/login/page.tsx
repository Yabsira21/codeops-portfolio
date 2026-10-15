import LoginForm from "../_components/LoginForm";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const { next } = await searchParams;

  // only allow redirects to internal paths
  const safeNext =
    next && next.startsWith("/") && !next.startsWith("//") ? next : "/menu";

  return <LoginForm next={safeNext} />;
}
