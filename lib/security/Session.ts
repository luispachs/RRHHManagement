import { User } from "@/types/Models/user";
import { RedisClientType, createClient } from "redis";
import bcrypt from 'bcrypt';
export class Session{
    #client:RedisClientType;
    constructor(){
        this.#client = createClient(
            {
                url:`redis://${process.env.REDIS_USER}:${process.env.REDIS_PASSWORD}@${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`
            }
        );

        this.#client.on('error',(err:any)=>{
            console.log('redis clien error',err)
        });

        
    }

    async #connect(){
        await this.#client.connect();
    }

    async  generate(user:User,ip:string):Promise<string>{
        await this.#connect();
        const dataToHash = `${user.id}-${user.email}-${ip}`;
        const salt = bcrypt.genSaltSync(parseInt(process.env.SALT  as string));
        const hash = bcrypt.hashSync(dataToHash,salt)

        this.#client.set(hash,JSON.stringify(user));
        this.#client.expire(hash,(parseInt(process.env.SESSION_EXPIRE as string) * 60));
        

        return hash;
    }

    async validate(session:string,ip:string):Promise<User|null>{
        await this.#connect();
        const data=await this.#client.get(session);
        if(data===null){
            return null;
        }
        const user = JSON.parse(data);
        const dataToHash = `${user.id}-${user.email}-${ip}`;
        const isValid = bcrypt.compareSync(dataToHash,session);
        
        if(!isValid){
            return null;
        }
        
        this.#client.expire(session,(parseInt(process.env.SESSION_EXPIRE as string) * 60));
        
         return JSON.parse(data);
        
    }




}