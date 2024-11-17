export type FormValues = {
    name: string
    username: string
    email: string
    password: string
    confirm: string
  }

  export type UserDto = {
    name: string,
    email: string,
    userName: string
    token: string,
    id: string,
  }

  export type UpdateUserDto = {
    name: string,
    email: string,
    userName: string
  }

  export interface User {
    name: string,
    email: string,
    userName: string
    token: string
    id: string,
  }