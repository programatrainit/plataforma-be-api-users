import express, { Application } from 'express';
import { urlencoded, json } from 'body-parser';
import cors, { CorsOptions, CorsOptionsDelegate } from 'cors';
import helmet from 'helmet';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
// import { Routes } from './routes';
import { UserRoutes } from './routes/user.routes';
import { ModuleRoutes } from './routes/module.routes';
import { WinstonLogger } from '../logger';
import { Postgres } from '../postgres/Postgres';
import 'reflect-metadata';
import { RolRoutes } from './routes/rol.routes';

class App {
  public server: Application;
  // public appRoutes: Routes = new Routes();
  public userRoutes: UserRoutes = new UserRoutes();
  public rolRoutes:RolRoutes = new RolRoutes();
  public moduleRoutes: ModuleRoutes = new ModuleRoutes();
  
  public database: Postgres = new Postgres();
  public log: WinstonLogger = new WinstonLogger();
  private BASE_PATH: string = process.env.BASE_PATH || '/api';
  private corsOptions: CorsOptions | CorsOptionsDelegate | undefined;

  constructor() {
    this.server = express();
    this.config();
  }

  private config(): void {
    if (process.env.NODE_ENV !== 'production') {
      this.server.use(
        `${this.BASE_PATH}/docs`,
        swaggerUi.serve,
        swaggerUi.setup(YAML.load('./docs/swagger.yaml'), {}),
      );
    }
    this.corsOptions = {
      origin:
        process.env.NODE_ENV === 'production' ? process.env.CORS_ORIGIN : '*',
      optionsSuccessStatus: 200,
    };
    this.server.use(cors(this.corsOptions));
    this.server.use(json());
    this.server.use(urlencoded({ extended: true }));
    this.server.use(helmet.xssFilter());
    this.server.use(helmet.noSniff());
    this.server.use(helmet.hidePoweredBy());
    this.server.use(helmet.frameguard({ action: 'deny' }));
    // this.server.use(this.BASE_PATH, this.appRoutes.routes()); // Ruta general
    this.server.use(this.BASE_PATH, this.rolRoutes.routes());// Ruta de usuarios
    this.server.use(this.BASE_PATH, this.userRoutes.routes()); // Ruta de roles
    this.server.use(this.BASE_PATH, this.moduleRoutes.routes()); // Ruta de modulos
    this.log.initializer();
    this.database.connection();
  }
}

export default new App().server.listen(
  Number(process.env.PORTSERVER) || 3000,
  () => {
    log.info(`Server listening port: ${process.env.PORTSERVER} `);
  },
);
