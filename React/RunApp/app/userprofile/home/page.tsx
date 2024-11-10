import UserProfilePageHome from "@/app/features/profiles/userprofile/UserProfilePageHome";
import UserProfilePageLayout from "@/app/features/profiles/userprofile/UserProfilePageLayout";

export default function UserProfileMain(){
    return <UserProfilePageLayout>
        <UserProfilePageHome/>
    </UserProfilePageLayout>
}