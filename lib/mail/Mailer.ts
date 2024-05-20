import { Transporter } from "nodemailer";
import { mailerClient } from "./Client";
import SMTPTransport from "nodemailer/lib/smtp-transport";


export class Mailer {
    #client:Transporter<SMTPTransport.SentMessageInfo>;
    constructor(){
        this.#client = mailerClient.getClient();
    }

    async send(params:{from:string;to:string,subject:string;text:string;html:string}):Promise<String>{
        let info =await this.#client.sendMail(params);
        return info.messageId;  
    }
}