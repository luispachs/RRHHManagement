import { NextRequest as BaseRequest } from "next/server";
import { User } from "../Models/user";


declare global {
        interface NextRequest extends BaseRequest{
        user:User|null;
    }
}