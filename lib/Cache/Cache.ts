import { CacheClient } from "./CacheClient";

export class Cache {
    

    static async put(key:string,value:any,ttl:number):Promise<any>{

        const cacheClient =await new CacheClient( 
                                            {
                                                host:process.env.REDIS_HOST,
                                                port:parseInt(process.env.REDIS_PORT as string),
                                                username:process.env.REDIS_USER,
                                                password:process.env.REDIS_PASSWORD
                                            }
                                        ).client();
        await cacheClient.set(key,JSON.stringify(value));
        await cacheClient.expire(key,ttl);

        return value;
    }
    static async get(key:string):Promise<any>{
        const cacheClient =await new CacheClient( 
            {
                host:process.env.REDIS_HOST,
                port:parseInt(process.env.REDIS_PORT as string),
                username:process.env.REDIS_USER,
                password:process.env.REDIS_PASSWORD
            }
        ).client();

        let data = await cacheClient.get(key);
        return JSON.parse(data);
    }
    static async delete(key:string):Promise<void>{
        const cacheClient =await new CacheClient( 
            {
                host:process.env.REDIS_HOST,
                port:parseInt(process.env.REDIS_PORT as string),
                username:process.env.REDIS_USER,
                password:process.env.REDIS_PASSWORD
            }
        ).client();

        let data = await cacheClient.del(key);
    }
}