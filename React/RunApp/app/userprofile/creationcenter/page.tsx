import CreationCenterDashboard from "@/app/features/profiles/creationcenter/CreationCenterDashboard";
import AuthorizationAttribute from "@/app/utils/AuthorizationAttribute";

function CreationCenter() {
  return <AuthorizationAttribute>
    <CreationCenterDashboard />;
    </AuthorizationAttribute>
}

export default CreationCenter;
