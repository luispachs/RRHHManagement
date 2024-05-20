import nodemailer from 'nodemailer';

class Client{
    #transport :any;
    constructor(host?:string,port?:number,secure?:boolean,user?:string,password?:string){
        if(host==undefined||port==undefined||secure==undefined||user==undefined||password==undefined){
            throw Error("Some one property set in the transport is \"undefined\"");
        }

        this.#transport ={
            host,
            port,
            secure,
            auth:{
                user,
                password
            }
        }

        
    }

    getClient(){
        return nodemailer.createTransport(this.#transport);  
    }
}

const mailerClient = new Client(process.env.HOST_MAILER,parseInt(process.env.PORT_MAILER as string),(process.env.SECURE_MAILER=="true")?true:false,process.env.USER_MAILER,process.env.PASSWORD_MAILER);

Object.freeze(mailerClient);

export {mailerClient};