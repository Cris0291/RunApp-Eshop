import UserProfileDiscount from "@/app/features/profiles/userprofile/UserProfileDiscount";
import UserProfilePageLayout from "@/app/features/profiles/userprofile/UserProfilePageLayout";

export default function UserProfileProductsWithDiscount(){
    return <UserProfilePageLayout>
        <UserProfileDiscount/>
    </UserProfilePageLayout>
}