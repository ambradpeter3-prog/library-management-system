// Redirect /  →  /dashboard for any authenticated user who lands here
import { redirect } from "next/navigation";

export default function DashboardIndex() {
  redirect("/dashboard");
}
