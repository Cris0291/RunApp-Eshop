import UserSettingsPage from "@/app/features/profiles/userprofile/settings/UserSettingsPage";
import UserProfilePageLayout from "@/app/features/profiles/userprofile/UserProfilePageLayout";

export default function SettingsPage(){
    return <UserProfilePageLayout>
        <UserSettingsPage/>
    </UserProfilePageLayout>
}