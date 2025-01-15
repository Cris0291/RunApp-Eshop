import SectionPage from "./sections/SectionsPage";
import UserSettingsPage from "./settings/UserSettingsPage";
import UserProfileDiscount from "./UserProfileDiscount";
import UserProfilePageHome from "./UserProfilePageHome";

export default function UserProfileLayoutWrapper({item, onSetActiveLink}: {item: string, onSetActiveLink: (newLink: string) => void}){
    switch(item){
        case "Dashboard":
            return <UserProfilePageHome/>
        case "Sections":
            return <SectionPage onSetActiveLink={onSetActiveLink}/>
        case "Discounts":
            return <UserProfileDiscount/>
        case "Settings":
            return <UserSettingsPage/>
    }
}