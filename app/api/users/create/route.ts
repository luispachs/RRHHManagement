import UserRepository from "@/repositories/UserRepository";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcrypt';

export async function POST(request:NextRequest){
    try{
    const repository = new UserRepository();
    const salt = bcrypt.genSaltSync(parseInt(process.env.SALT as string));
    const hash=bcrypt.hashSync("yenifer-101291",salt);
        repository.create({
        firstname:"luis",
        lastname:'pacheco',
        fullname:'luis pacheco',
        password:hash,
        email:"laps1308@gmail.com",
        username:"admin",
        roleId:1
    });
    return NextResponse.json({status:200,message:'ok'});
    }catch(error){
        console.log(error)
;    return NextResponse.json({status:500,message:'not ok'});

    }
}