import { genSaltSync, hashSync } from "bcrypt";

export class TokenGenerator{
    static generate(data:string):string{
        
        const salt = genSaltSync(15);
        let unformatedToken = hashSync(data,salt);
        const regex = new RegExp(/[\$\\\/\.\?\¿#-_]/,'gm');
        let token = unformatedToken.replaceAll(regex,'');
        return token;
    }
}