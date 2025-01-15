import { useAuth } from "./AuhtProvider";
import AccessRestricted from "@/ui/AccessRestricted";

export default function PrivateRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { authStatus } = useAuth();

  return authStatus ? children : <AccessRestricted />;
}
