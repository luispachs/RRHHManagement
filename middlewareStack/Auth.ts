'use server';
import { cookies,headers } from "next/headers";
import {  NextResponse } from "next/server";


export default async function Auth(request:NextRequest,response:NextResponse,Stack:Array<CallableFunction>,next:number){
        try{    

                
                if(request.nextUrl.pathname.startsWith('/app')){
                        
                        const headersList = headers();
                        const ip = headersList.get('x-forwarded-for')?.valueOf() as  string; 
                        if(!request.cookies.has('session')){
                                return NextResponse.redirect(new URL('/',process.env.BASE_HOST))
                        }
        
                        const sessionId = request.cookies.get('session')?.value;
                        let validationResponse = await fetch(`${process.env.BASE_API_HOST as string}/auth`,{
                                method:'POST',
                                body: JSON.stringify({"session":sessionId,"ip":ip})
                        });
                        let data = await validationResponse.json();
                        if(data.status == 400 || data.status == 500){
                                request.cookies.delete('session');
                                request.user=null;
                                let response = NextResponse.redirect(new URL('/',process.env.BASE_HOST));
                                response.cookies.delete('session');
                                
                                return response;
                        }
                        
                        request.user = data.user;
                               
                }
                
                if(Stack.length == next+1){
                        return response;
                        
                }
        
                return Stack[next++](request,response,Stack,next++);
        }
        catch(error){
                console.log(error);
                return NextResponse.redirect(new URL('/',process.env.BASE_HOST));
        }
        
}