import { Session } from "@/lib/security/Session";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest){
    let data = await request.json();

    const session = new Session();
    const key = data.session;
    console.log(decodeURI(key));
    let isValid = await session.validate(key);

    if(isValid){

    }


}