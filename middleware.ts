'use server'
import { NextRequest, NextResponse } from "next/server";
import Stack from "./middlewareStack/Stack";
import { cookies } from "next/headers";

export async function middleware(request:NextRequest){
   
   let response = NextResponse.next();
   if(!request.cookies.has('_locale')){
       response.cookies.set('_locale','en');
   }
   
   return await  Stack(request,response)
}

export const config = {
    matcher:[
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ]
}