import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import Container from "@/components/Container";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/login");
  }

  return (
    <Container className="py-12">
      <h1 className="mb-2 text-3xl font-bold tracking-tight">Dashboard</h1>
      <p className="mb-8 text-gray-600">
        Welcome back, {session.user.name || session.user.email}
      </p>
    </Container>
  );
}
