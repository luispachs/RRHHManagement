import { connnection } from "@/lib/database/connection";
import { RepositoryInterface } from "./RepositoryInterface";
import { User } from "@/types/Models/user";

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
    async getByUsername(value:string){
        return this.client().users.findFirst({
            where:{
                username:value
            }
        });
    }

}