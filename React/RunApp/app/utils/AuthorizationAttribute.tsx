"use client"

import { getUserConfirmationOfRegistration } from "../features/registration/userSlice";
import { useAppSelector } from "../hooks/reduxHooks"
import AccessRestricted from "../ui/AccessRestricted";

export default function AuthorizationAttribute({children}: {children: React.ReactNode}){
    const isRegitered = useAppSelector(getUserConfirmationOfRegistration);

    return isRegitered ? children : <AccessRestricted/>
    
}