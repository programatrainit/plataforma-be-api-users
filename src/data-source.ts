import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./Users/infrastructure/persistence/Postgres/model/UserModel"
import { Roles } from "./Roles/infrastruture/persistence/postgres/model/RolModel"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "0000",
    database: "train_it_db",
    synchronize: true,
    logging: false,
    entities: [User,Roles],
    migrations: ["src/migrations/**/*.ts"],
    subscribers: [],
})

