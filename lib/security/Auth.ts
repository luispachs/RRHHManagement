import jose from 'jose';
import bcrypt from 'bcrypt';
import {User} from '@/types/Models/user'
import {Auth as auth} from '@/types/extras/Auth';
import { Session } from './Session';
export  class Auth{
    static auth(user:User,password:string,ip:string):auth{
       let isValid = bcrypt.compareSync(password,user.password);

       if(!isValid){
        return  {status:500,session:null,token:null}
       }
       let sessionInstace = new Session();
       const token =  Auth.JWT(user,ip);
       const sessionId = sessionInstace.generate(user).then(session => session);
        return {status:200,session:sessionId,token:token}
    }

    static JWT(user:User,ip:string):string{
        const alg = process.env.JWT_ALG as string;
        const token =new jose.SignJWT({'urn:claim:id':user.id,'urn:claim:date': new Date().toISOString(),'urn:claim:user':user.fullname})
                                .setProtectedHeader({alg})
                                .setExpirationTime(`${process.env.JWT_EXPIRATION} hours`)
                                .setAudience()
                                .setIssuer(user.email)
                                .sign(new TextEncoder().encode(process.env.JWT_TOKEN))

        return "";
    }

    static validateSession(user:any, session:string){

    }

    static validateJWT(user:any,jwt:string){

    }

}