import { NextRequest, NextResponse } from "next/server";
import Auth from "@/middlewareStack/Auth";
const stackMiddleware =[
    Auth
];
export default async function Stack(request:NextRequest,response:NextResponse){
    let current = 0;
    if(stackMiddleware.length ===0){
        return response;
    }
    return await stackMiddleware[0](request,response,stackMiddleware,current++);
}