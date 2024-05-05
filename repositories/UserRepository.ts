import { connnection } from "@/lib/database/connection";
import { RepositoryInterface } from "./RepositoryInterface";

export default class UserRepository extends connnection implements RepositoryInterface{

    constructor(){
        super();
        
    }
    async getAll(): Promise<any> {
        throw new Error("Method not implemented.");
    }
    async getById(): Promise<any> {
        throw new Error("Method not implemented.");
    }
    async create(): Promise<any> {
        throw new Error("Method not implemented.");
    }
    async update(): Promise<any> {
        throw new Error("Method not implemented.");
    }
    async delete(): Promise<any> {
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