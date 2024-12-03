import UserProfilePageLayout from "../features/profiles/userprofile/UserProfilePageLayout";
import AuthorizationAttribute from "../utils/AuthorizationAttribute";

function UserProfile() {
  return <AuthorizationAttribute>
    <UserProfilePageLayout />
    </AuthorizationAttribute>;
}

export default UserProfile;
