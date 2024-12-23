import axios from "axios";
import { UserBoughtProducts, UserLikes, UserReviews } from "../features/profiles/userprofile/contracts";

axios.defaults.baseURL = "http://localhost:5253"; 

export default async function GetUserReviews(token: string){
    return axios.get<UserReviews>("api/user/reviews", {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    }).then(response => response.data)
}

export async function GetUserLikedProducts(token: string){
    return axios.get<UserLikes>("api/user/likes", {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    }).then(response => response.data)
}

export async function GetUserBoughtProducts(token: string){
    return axios.get<UserBoughtProducts>("api/user/bought-products", {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    }).then(response => response.data)
}