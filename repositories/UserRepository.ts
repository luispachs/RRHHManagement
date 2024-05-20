import { connnection } from "@/lib/database/connection";
import { RepositoryInterface } from "./RepositoryInterface";
import { User } from "@/types/Models/user";
import { Cache } from "@/lib/Cache/Cache";

export default class UserRepository extends connnection implements RepositoryInterface{
    
    constructor(){
        super();

        
    }
    async getAll(): Promise<any> {
        throw new Error("Method not implemented.");
    }
    async getById(id:number): Promise<any> {
        throw new Error("Method not implemented.");
    }
    async create(user:User): Promise<any> {
        return await this.client().users.create(
            {
                data:user 
            }
        )  
    }
    async update(data:User): Promise<any> {
        throw new Error("Method not implemented.");
    }
    async delete(data:number): Promise<any> {
        throw new Error("Method not implemented.");
    }
    async getByUsername(value:string,useCache:boolean=true){
        const key = `GetUserByUsername_${value}`;
        let user = null;
        if(useCache){
            user =await Cache.get(key);
            

            if(user!=null){
                return user;
            }
        }


        user=await this.client().users.findFirst({
            where:{
                username:value
            }
        });
 
        return await Cache.put(key,user,600);
    }

    async getUserByEmail(email:string,useCache:boolean =true){

        const key = `GetUserByEmail_${email}`;

        let user =null;
        if(useCache){
            user=await Cache.get(key);
            if(user!=null){
                return user;
            }
        }

        user = await this.client().users.findFirst({
            where:{
                email:email
            }
        });

       return await  Cache.put(key,user,300);
    }

}