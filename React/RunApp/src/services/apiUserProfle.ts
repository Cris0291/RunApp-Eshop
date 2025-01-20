import {
  SimpleBoughtProducts,
  UserBoughtProducts,
  UserLikes,
  UserReviews,
} from "../features/profiles/userprofile/contracts";
import { axiosInstance } from "./axiosInstance";

export default async function GetUserReviews() {
  return axiosInstance
    .get<UserReviews[]>("api/user/reviews")
    .then((response) => response.data);
}

export async function GetUserLikedProducts() {
  return axiosInstance
    .get<UserLikes[]>("api/user/likes")
    .then((response) => response.data);
}

export async function GetUserBoughtProducts() {
  return axiosInstance
    .get<UserBoughtProducts[]>("api/user/bought-products")
    .then((response) => response.data);
}

export async function GetBoughtProducts() {
  return axiosInstance
    .get<SimpleBoughtProducts>("api/user/bought")
    .then((response) => response.data);
}
