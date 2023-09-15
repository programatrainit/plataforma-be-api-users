import { Router } from 'express';
import { VersionHealth } from '../../../../../version';
import {UsersRepository} from '../../../../../Users/infrastructure/persistence/Postgres/UserRepository'
import {CreateUserUseCase} from '../../../../../Users/application/use-case/CreateUserUseCase'
import { CreateUserController } from '../../../../../Users/infrastructure/controller/CreateUserController';
import { IUserFindAll } from '../../../../../Users/application/use-case/interface/IUsersFindAll';
import {IUserCreate} from '../../../../../Users/application/use-case/interface/IUserCreate'
import {FindAllUsersUseCase  } from '../../../../../Users/application/use-case/FindAllMetricUseCase';
import { FindAllUserController } from '../../../../../Users/infrastructure/controller/FindAllUserController';
import { User } from '../../../../../Users/infrastructure/persistence/Postgres/model/UserModel';



export class Routes {

  public router: Router;
  private versionHealth: VersionHealth;
  private userRepository: UsersRepository = new UsersRepository(User);
  private createUserUseCase: IUserCreate = new CreateUserUseCase(this.userRepository);
  private findAllMetricUseCase: IUserFindAll = new FindAllUsersUseCase(this.userRepository);

  private createUserController: CreateUserController;
  private findAllUserController: FindAllUserController;

  constructor() {
    this.router = Router();
    this.versionHealth = new VersionHealth();
    this.createUserController = new CreateUserController(this.createUserUseCase);
    this.findAllUserController = new FindAllUserController(this.findAllMetricUseCase);
  }

  public routes(): Router {
    this.router.get('/health', this.versionHealth.run);
    this.router.post('/users', this.createUserController.run);
    this.router.get('/users', this.findAllUserController.run);

    return this.router;
  }
}
