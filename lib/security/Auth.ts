import * as jose from 'jose';
import bcrypt from 'bcrypt';
import {User} from '@/types/Models/user'
import {Auth as auth} from '@/types/extras/Auth';
import { Session } from './Session';
import { NextRequest } from 'next/server';
export  class Auth{
    static async auth(user:User,password:string,ip:string):Promise<auth>{

       let isValid = bcrypt.compareSync(password,user.password);

       if(!isValid){
        return  {status:500,session:null,token:null}
       }
       let sessionInstance = new Session();
       const token =  await Auth.JWT(user,ip);
       const sessionId = await sessionInstance.generate(user) as string;
        return {status:200,session:sessionId,token:token}
    }

    static async JWT(user:User,ip:string):Promise<string>{
        const alg = process.env.JWT_ALG as string;
        const token =await new jose.SignJWT({'urn:claim:id':user.id,'urn:claim:date': new Date().toISOString(),'urn:claim:user':user.fullname,'urn:claim:address':ip})
                                .setProtectedHeader({alg})
                                .setExpirationTime(`${process.env.JWT_EXPIRATION} hours`)
                                .setAudience(ip)
                                .setIssuer(user.email)
                                .sign(new TextEncoder().encode(process.env.JWT_TOKEN));

        return token;
    }

    static validateSession(user:any, session:string){

    }

    static validateJWT(user:any,jwt:string){

    }

}