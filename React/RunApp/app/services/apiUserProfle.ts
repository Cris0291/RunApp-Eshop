import { SimpleBoughtProducts, UserBoughtProducts, UserLikes, UserReviews } from "../features/profiles/userprofile/contracts";
import { axiosInstance } from "./axiosInstance";

export default async function GetUserReviews(token: string){
    return axiosInstance.get<UserReviews>("api/user/reviews", {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    }).then(response => response.data)
}

export async function GetUserLikedProducts(token: string){
    return axiosInstance.get<UserLikes>("api/user/likes", {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    }).then(response => response.data)
}

export async function GetUserBoughtProducts(token: string){
    return axiosInstance.get<UserBoughtProducts>("api/user/bought-products", {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    }).then(response => response.data)
}

export async function GetBoughtProducts(token: string){
    return axiosInstance.get<SimpleBoughtProducts>("api/user/bought", {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    }).then(response => response.data)
}