import { Router } from 'express';
import { VersionHealth } from '../../../../../version';
// import { MetricRepository } from '../../../../../metrics/infrastructure/persistence/mongoose/MetricRepository';
import {UsersRepository} from '../../../../../Users/infrastructure/persistence/Postgres/UserRepository'
// import { CreateMetricUseCase } from '../../../../../metrics/application/use-case/CreateMetricUseCase';
import {CreateUserUseCase} from '../../../../../Users/application/use-case/CreateUserUseCase'
 import { CreateUserController } from '../../../../../Users/infrastructure/controller/CreateUserController';
// import { IMetricCreate } from '../../../../../metrics/application/use-case/interface/IMetricCreate';
import { IUserFindAll } from '../../../../../Users/application/use-case/interface/IUsersFindAll';
import {IUserCreate} from '../../../../../Users/application/use-case/interface/IUserCreate'
import {FindAllUsersUseCase  } from '../../../../../Users/application/use-case/FindAllMetricUseCase';
import { FindAllUserController } from '../../../../../Users/infrastructure/controller/FindAllUserController';
import { FindOneUserController } from '../../../../../Users/infrastructure/controller/FindOneUserController';
import { IUserFindOne } from '../../../../../Users/application/use-case/interface/IUsersFindOne';
import { User } from '../../../../../Users/infrastructure/persistence/Postgres/model/UserModel';
import { FindOneUserUseCase } from '../../../../../Users/application/use-case/FindOneUserUseCase';



export class Routes {

  public router: Router;
  private versionHealth: VersionHealth;
  private userRepository: UsersRepository = new UsersRepository(User);
  private createUserUseCase: IUserCreate = new CreateUserUseCase(this.userRepository);
   private findAllMetricUseCase: IUserFindAll = new FindAllUsersUseCase(this.userRepository);
  private findOneUserUseCase: IUserFindOne = new FindOneUserUseCase(this.userRepository)

   private createUserController: CreateUserController;
  private findAllUserController: FindAllUserController;
  private findOneUserController: FindOneUserController;

  constructor() {
    this.router = Router();
    this.versionHealth = new VersionHealth();
    this.createUserController = new CreateUserController(this.createUserUseCase);
    this.findAllUserController = new FindAllUserController(this.findAllMetricUseCase);
    this.findOneUserController = new FindOneUserController(this.findOneUserUseCase);
  }

  public routes(): Router {
    this.router.get('/health', this.versionHealth.run);
    this.router.post('/users', this.createUserController.run);
    this.router.get('/users', this.findAllUserController.run);
    this.router.get('/users/:id', this.findOneUserController.run);

    return this.router;
  }
}
