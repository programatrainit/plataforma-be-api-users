import { DataSource } from 'typeorm';
import 'dotenv/config';
import { User } from '../../../../Users/infrastructure/persistence/Postgres/model/UserModel';
import { Rol } from '../../../../Roles/infrastruture/persistence/postgres/model/RolModel';
import { Module } from '../../../../Modules/infrastructure/persistence/postgres/model/ModuleModel';


export class Postgres {
  // se modifico la variable db es static para poder utilizar el contexto de DataSource
  static db: DataSource = new DataSource({
    type: 'postgres',
    host: 'postgres',
    port: 5432,
    username: `${process.env.POSTGRES_USER}`,
    password: `${process.env.POSTGRES_PASSWORD}`,
    database: `${process.env.POSTGRES_DB}`,
    synchronize: true,
    logging: true,
    entities: [User, Module, Rol],
    subscribers: [],
    migrations: [],
  });

  constructor() { }

  connection(): void {
    Postgres.db
      .initialize()
      .then(() => log.info(
        `Successfully connected to database:${Postgres.db.options.database} , type:${Postgres.db.options.type}  `,
      ))
      // .then(() => console.log(`Successfully connected to ${this.db}`))
      .catch((error) => log.error('Error connecting to database: ', error));
  }
}
