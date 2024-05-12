import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export default async function Auth(request:NextRequest,response:NextResponse,Stack:Array<CallableFunction>,next:number){
        if(request.nextUrl.pathname.startsWith('/app')){
                const cookieList = cookies();
                if(!cookieList.has('session')){
                        return NextResponse.redirect('/')
                }

                const session = cookieList.get('session')?.value;
                

        }else{
                if(Stack.length == next+1){
                        return response;
                }

                return Stack[next++](request,response,Stack,next++);
        }
}