import { DBSingleton } from "./DBSingleton";

export class connnection{
    
    client(){

        return DBSingleton.getInstance();
    }
}