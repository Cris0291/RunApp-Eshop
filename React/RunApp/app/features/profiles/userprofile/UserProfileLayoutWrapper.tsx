import SectionPage from "./sections/SectionsPage";
import UserSettingsPage from "./settings/UserSettingsPage";
import UserProfileDiscount from "./UserProfileDiscount";
import UserProfilePageHome from "./UserProfilePageHome";

export default function UserProfileLayoutWrapper({item}: {item: string}){
    switch(item){
        case "Dashboard":
            return <UserProfilePageHome/>
        case "Sections":
            return <SectionPage/>
        case "Discounts":
            return <UserProfileDiscount/>
        case "Settings":
            return <UserSettingsPage/>
    }
}