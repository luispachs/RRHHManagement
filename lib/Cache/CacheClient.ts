import { RedisClientType, RedisFunctions, RedisModules, RedisScripts, createClient } from "redis";
import rrhhLoger from "../logger/RRHHLogger";
import RedisClient from "@redis/client/dist/lib/client";

export class CacheClient{

    #client:any;
    #port?:number;
    #host?:string;
    #username?:string;
    #password?:string;
    #connection:string|null = "";

    constructor(params:{host?:string;port?:number;username?:string;password?:string}){
        this.#connection= `redis://${params.username}:${params.password}@${params.host}:${params.port}`;
       if(params.username ==undefined || params.password ==undefined || params.host==undefined  || params.port==undefined  ){
            this.#connection = null;
       }    
    }

    async client(){
        if(this.#connection==null){
            this.#client = await createClient()
            .on('error',error =>{
                rrhhLoger.error(error);
            })
            .connect();
        }else{
            this.#client = await createClient(
                {
                    url:this.#connection
                }
            )
                                .on('error',error =>{
                                    rrhhLoger.error(error);
                                })
                                .connect();
        }
        

        return this.#client;
    }
    async close(){
        await this.#client?.disconnect();
    }
}

