import { User } from "../Models/user";

export type AuthResponse={
    status:200|400|500;
    message:string;
    user?:User
}