import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '@prisma/client'

class DBSingleton{

    getInstance():PrismaClient<any>{
        let instance = null;

        if( instance == null){

            const connectionString = `${process.env.DATABASE_URL}`

            const pool = new Pool({ connectionString });
            const adapter = new PrismaPg(pool);
            instance = new PrismaClient({adapter:adapter});

        }

        return instance
    }
}


const client = new DBSingleton();

Object.freeze(client);

export default client;