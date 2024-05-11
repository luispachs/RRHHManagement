export interface  RepositoryInterface{
    getAll():Promise<any>
    getById(id:number):Promise<any>
    create(data:any):Promise<any>
    update(data:any):Promise<any>
    delete(data:any):Promise<any>
}