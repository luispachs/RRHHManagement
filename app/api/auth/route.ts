import { Session } from "@/lib/security/Session";
import { NextRequest, NextResponse } from "next/server";
import { AuthResponse } from "@/types/extras/AuthResponse";

export async function POST(request: NextRequest){
    let data = await request.json();

    const session = new Session();
    const key = data.session;
    const ip =data.ip;
    let isValid = await session.validate(decodeURI(key),ip);

    if(isValid==null){
        return NextResponse.json({status:400,message:"UnAuthorize"} as AuthResponse);
    }

    return NextResponse.json({status:200,message:"Authorize",user:isValid} as AuthResponse)

}