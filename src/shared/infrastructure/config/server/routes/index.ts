import { Router } from 'express';
import { VersionHealth } from '../../../../../version';
import {UsersRepository} from '../../../../../Users/infrastructure/persistence/Postgres/UserRepository';
import {CreateUserUseCase} from '../../../../../Users/application/use-case/CreateUserUseCase';
import { CreateUserController } from '../../../../../Users/infrastructure/controller/CreateUserController';
import {IUserCreate} from '../../../../../Users/application/use-case/interface/IUserCreate';
import {FindAllUsersUseCase  } from '../../../../../Users/application/use-case/FindAllMetricUseCase';
import { FindAllUserController } from '../../../../../Users/infrastructure/controller/FindAllUserController';
import { IUserFindAll } from '../../../../../Users/application/use-case/interface/IUsersFindAll';
import {UpdateUserUseCase} from '../../../../../Users/application/use-case/UpdateUserUseCase'
import {IUserUpdate} from '../../../../../Users/application/use-case/interface/IUserUpdate'
import {UpdateUserConstroller} from '../../../../../Users/infrastructure/controller/UpdateUserController'
import { FindOneUserController } from '../../../../../Users/infrastructure/controller/FindOneUserController';
import { IUserFindOne } from '../../../../../Users/application/use-case/interface/IUsersFindOne';
import { User } from '../../../../../Users/infrastructure/persistence/Postgres/model/UserModel';
import { FindOneUserUseCase } from '../../../../../Users/application/use-case/FindOneUserUseCase';
import { IUserDelete } from '../../../../../Users/application/use-case/interface/IUserDelete';
import { DeleteUserUseCase } from '../../../../../Users/application/use-case/DeleteUserUseCase';
import { DeleteUserController } from '../../../../../Users/infrastructure/controller/DeleteUserController';



export class Routes {

  public router: Router;
  private versionHealth: VersionHealth;
  private userRepository: UsersRepository = new UsersRepository(User);
  private createUserUseCase: IUserCreate = new CreateUserUseCase(this.userRepository);
   private findAllMetricUseCase: IUserFindAll = new FindAllUsersUseCase(this.userRepository);
  private findOneUserUseCase: IUserFindOne = new FindOneUserUseCase(this.userRepository);
  private deleteUserUseCase: IUserDelete = new DeleteUserUseCase(this.userRepository);

  private createUserController: CreateUserController;
  private findAllUserController: FindAllUserController;
  private findOneUserController: FindOneUserController;
  private deleteUserController: DeleteUserController;

  constructor() {
    this.router = Router();
    this.versionHealth = new VersionHealth();
    this.createUserController = new CreateUserController(this.createUserUseCase);
    this.findAllUserController = new FindAllUserController(this.findAllMetricUseCase);
    this.findOneUserController = new FindOneUserController(this.findOneUserUseCase);
    this.deleteUserController = new DeleteUserController(this.deleteUserUseCase);
  }

  public routes(): Router {
    this.router.get('/health', this.versionHealth.run);
    this.router.post('/users', this.createUserController.run);
    this.router.get('/users', this.findAllUserController.run);
    this.router.get('/users/:id', this.findOneUserController.run);
    this.router.delete('/users/:id', this.deleteUserController.run);

    return this.router;
  }
}
