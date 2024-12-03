"use client"

import { getUserToken } from "../features/registration/userSlice";
import { useAppSelector } from "../hooks/reduxHooks"
import AccessRestricted from "../ui/AccessRestricted";

export default function AuthorizationAttribute({children}: {children: React.ReactNode}){
    const token = useAppSelector(getUserToken);

    return token.trim().length > 0 ? children : <AccessRestricted/>
    
}