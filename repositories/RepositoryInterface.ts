export interface  RepositoryInterface{
    getAll():Promise<any>
    getById():Promise<any>
    create():Promise<any>
    update():Promise<any>
    delete():Promise<any>
}