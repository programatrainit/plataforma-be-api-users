import { Router } from 'express';
import { UsersRepository } from '../../../../../Users/infrastructure/persistence/Postgres/UserRepository';
import { CreateUserUseCase } from '../../../../../Users/application/use-case/CreateUserUseCase';
import { CreateUserController } from '../../../../../Users/infrastructure/controller/CreateUserController';
import { IUserCreate } from '../../../../../Users/application/use-case/interface/IUserCreate';
import { FindAllUsersUseCase } from '../../../../../Users/application/use-case/FindAllUserUseCase';
import { FindAllUserController } from '../../../../../Users/infrastructure/controller/FindAllUserController';
import { IUserFindAll } from '../../../../../Users/application/use-case/interface/IUsersFindAll';
import { UpdateUserUseCase } from '../../../../../Users/application/use-case/UpdateUserUseCase';
import { IUserUpdate } from '../../../../../Users/application/use-case/interface/IUserUpdate';
import { UpdateUserConstroller } from '../../../../../Users/infrastructure/controller/UpdateUserController';
import { FindOneUserController } from '../../../../../Users/infrastructure/controller/FindOneUserController';
import { IUserFindOne } from '../../../../../Users/application/use-case/interface/IUsersFindOne';
import { User } from '../../../../../Users/infrastructure/persistence/Postgres/model/UserModel';
import { FindOneUserUseCase } from '../../../../../Users/application/use-case/FindOneUserUseCase';
import { IUserDelete } from '../../../../../Users/application/use-case/interface/IUserDelete';
import { DeleteUserUseCase } from '../../../../../Users/application/use-case/DeleteUserUseCase';
import { DeleteUserController } from '../../../../../Users/infrastructure/controller/DeleteUserController';

export class UserRoutes {
  public router: Router;
  private userRepository: UsersRepository = new UsersRepository(User);
  private createUserUseCase: IUserCreate = new CreateUserUseCase(
    this.userRepository,
  );

  private findAllMetricUseCase: IUserFindAll = new FindAllUsersUseCase(
    this.userRepository,
  );

  private findOneUserUseCase: IUserFindOne = new FindOneUserUseCase(
    this.userRepository,
  );

  private deleteUserUseCase: IUserDelete = new DeleteUserUseCase(
    this.userRepository,
  );

  private updateUserUseCase: IUserUpdate = new UpdateUserUseCase(
    this.userRepository,
  );

  private createUserController: CreateUserController;
  private findAllUserController: FindAllUserController;
  private findOneUserController: FindOneUserController;
  private deleteUserController: DeleteUserController;
  private updateUserConstroller: UpdateUserConstroller;

  constructor() {
    this.router = Router();
    this.createUserController = new CreateUserController(
      this.createUserUseCase,
    );
    this.findAllUserController = new FindAllUserController(
      this.findAllMetricUseCase,
    );
    this.findOneUserController = new FindOneUserController(
      this.findOneUserUseCase,
    );
    this.deleteUserController = new DeleteUserController(
      this.deleteUserUseCase,
    );
    this.updateUserConstroller = new UpdateUserConstroller(
      this.updateUserUseCase,
    );
  }

  public routes(): Router {
    this.router.post('/users', this.createUserController.run);
    this.router.get('/users', this.findAllUserController.run);
    this.router.get('/users/:id', this.findOneUserController.run);
    this.router.delete('/users/:id', this.deleteUserController.run);
    this.router.put('/users', this.updateUserConstroller.run);

    return this.router;
  }
}
