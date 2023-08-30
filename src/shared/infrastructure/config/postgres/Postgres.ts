import {DataSource, EntitySchema} from 'typeorm'
import 'dotenv/config'
import { error } from 'console';
import {User} from '../../../../Users/infrastructure/persistence/Postgres/model/UserModel'


export class Postgres{

    private db : DataSource
 
    constructor( ){
      this.db = new DataSource({
          type: "postgres",
           host:"postgres",
           port: 5432,
           username: `${process.env.POSTGRES_USER}`,
           password: `${process.env.POSTGRES_PASSWORD}`,
           database: `${process.env.POSTGRES_DB}`,
           synchronize: true,
           logging: true,
           entities: [User],
           subscribers: [],
           migrations: [],
         });
    }
  
    connection() : void {
          
      this.db.initialize()
          .then(() => log.info(`Successfully connected to database:${this.db.options.database} , type:${this.db.options.type} `))
        // .then(() => console.log(`Successfully connected to ${this.db}`))
          .catch((error) => log.error('Error connecting to database: ', error));
          //.catch((error) => console.log('Error connecting to database: ', error));
          
    }

}



// export const db = new DataSource({
//   type: "postgres",
//     host: "postgres",
//     port: 5432,
//     username: `${process.env.POSTGRES_USER}`,
//     password: `${process.env.POSTGRES_PASSWORD}`,
//     database: `${process.env.POSTGRES_DB}`,
//     synchronize: true,
//     logging: true,
//     entities: [],
//     subscribers: [],
//     migrations: [],
// })


// connection = (): void =>{

// }