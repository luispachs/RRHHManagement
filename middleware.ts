import { NextRequest, NextResponse } from "next/server";
import Stack from "./middlewareStack/Stack";

export async function middleware(request:NextRequest){
   let response = NextResponse.next();
   if(!request.cookies.has('__locale')){
        response.cookies.set('_locale','en');
   }

   return await  Stack(request,response)
}

export const config = {
    matcher:[
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ]
}