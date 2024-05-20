import { Mailer } from "../Mailer";
import fs from 'node:fs';
export class RecoveryPasswordMail extends Mailer{
    #template?:string;
    #content?:string;
    constructor(lang:string='en'){
        super();
        this.#content = fs.readFileSync(`RecoveryPasswordTemplate_${lang}.html`,{flag:'r+',encoding:'utf-8'});
    }

    get content(){
        return this.#content;
    }


    
}