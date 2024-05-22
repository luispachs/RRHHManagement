export type Token={
    id?:number;
    token:string;
    expire:string;
    userId:number;
    status:'ACTIVE'|'INACTIVE'
}