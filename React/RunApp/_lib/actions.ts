"use server"

import { FormValues } from "@/app/features/registration/contracts";
import { ProductForCard } from "@/app/features/store/products/contracts";
import registerRequest from "@/app/services/apiRegister";
import { AxiosError } from "axios";
import { redirect } from 'next/navigation'
import { z } from "zod";
import { cookies } from 'next/headers'
import loginRequest from "@/app/services/apiLogin";
import { LoginFormValues } from "@/app/features/login/contracts";
import { getProducts } from "@/app/services/apiProducts";

const RegisterSchema = z.object({
    name: z.string().trim().min(1, {message: "Name field is required"}),
    username: z.string().trim().min(1, {message: "User Name field is required"}),
    email: z.string().email({message: "Invalid email address"}),
    password: z.string().min(8, {message: "Password must be at least 8 characters"}).trim(),
    confirmpassword: z.string().min(8, {message: "Confirm Password must be at least 8 characters"}).trim(),
}).superRefine(({password, confirmpassword}, ctx) => {
    if(password !== confirmpassword){
        ctx.addIssue({
            code: "custom",
            message: "Password and Confirm password did not match",
            path: ["confirmpassword"]
        })
    }
})

const LoginSchema = z.object({
    email: z.string().email({message: "Invalid email address"}),
    password: z.string().min(8, {message: "Password must be at least 8 characters"}).trim(),
})

export async function GetProductsAction(formData: FormData){
    const search = formData.get("search") as string;
    const searchQuery = search.trim().length === 0 ? "search=all" : `search=${search}`;

    history.pushState(null, "", `?${searchQuery}`);
    redirect(`/products?${searchQuery}`);

}

export async function GetProductsServerAction(prevState:  any,  formData: FormData){
    const query = formData.get("query") as string;
    const products = await getProducts(query);

    if(products instanceof AxiosError){
        throw new Error(products.message);
    }

    return products;
}

export async function RegisterUser(prevState: any, formData: FormData){
    const formObject = Object.fromEntries(formData);
    const result = RegisterSchema.safeParse(formObject);

    if(!result.success){
        return {
            errors: result.error.flatten().fieldErrors,
        }
    }

    const registerForm: FormValues = {name: result.data.name, username:result.data.username, email: result.data.email, password: result.data.password, confirm: result.data.confirmpassword}

    const user = await registerRequest(registerForm);

    if(user instanceof AxiosError){
        throw new Error(user.message);
    }

    (await cookies()).set("session", JSON.stringify(user))
}

export async function LoginUser(prevState: any, formData: FormData){
    const formObject = Object.fromEntries(formData);
    const result = LoginSchema.safeParse(formObject);

    if(!result.success){
        return {
            errors: result.error.flatten().fieldErrors,
        }
    }

    const loginForm: LoginFormValues = {email: result.data.email, password: result.data.password}; 

    const user = await loginRequest(loginForm);

    if(user instanceof AxiosError){
        throw new Error(user.message);
    }

    (await cookies()).set("session", JSON.stringify(user))
}