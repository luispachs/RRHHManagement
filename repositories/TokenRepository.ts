import { User } from "@/types/Models/user";
import { connnection } from "@/lib/database/connection";
import { RepositoryInterface } from "./RepositoryInterface";
import { Token } from "@/types/Models/token";
import rrhhLoger from "@/lib/logger/RRHHLogger";
export class TokenRepository extends connnection implements RepositoryInterface{
    constructor(){
        super();
    }
    getAll(): Promise<any> {
        throw new Error("Method not implemented.");
    }
    getById(id: number): Promise<any> {
        throw new Error("Method not implemented.");
    }
    async create(data: any): Promise<any> {
        try{
            let  token = await this.client().tokens.create(
                {
                    data:data
                }
            );
    
            return token;
        }catch(error){
            rrhhLoger.error(error as Error);
            return null;
        }
    }
    update(data: any): Promise<any> {
        throw new Error("Method not implemented.");
    }
    delete(data: any): Promise<any> {
        throw new Error("Method not implemented.");
    }

    async DeactivateTokenByUser(user:User):Promise<Array<any>>{
      try{
        const tokens = await this.client().$transaction([
                this.client().tokens.updateMany({
                    where:{
                        userId:user.id!,
                        status:'ACTIVE'

                    },
                    data:{
                        status:'INACTIVE'
                    }
                })
        ]);

        return tokens;
      }catch(error){
        rrhhLoger.error(error as  Error);
        return [null];
      }
    }

}