import { Mailer } from "../Mailer";
import fs from 'node:fs';
import path from "node:path";
export class RecoveryPasswordMail extends Mailer{
    #content?:string;
    constructor(lang:string='en'){
        super();
        this.#content = fs.readFileSync(path.join('lib','mail','templates',`RecoveryPasswordTemplate_${lang}.html`),{flag:'r+',encoding:'utf-8'});
    }

    get content(){
        return this.#content;
    }

    setData(key:string, data:string){
        
        const pathern = `##${key}##`;
        this.#content= this.#content!.replaceAll(pathern,data);
    
    }    
}