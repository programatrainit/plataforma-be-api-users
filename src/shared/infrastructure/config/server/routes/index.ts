import { Router } from 'express';
import { VersionHealth } from '../../../../../version';
// import { MetricRepository } from '../../../../../metrics/infrastructure/persistence/mongoose/MetricRepository';
import {UsercRepository} from '../../../../../Users/infrastructure/persistence/Postgres/UserRepository'
// import { CreateMetricUseCase } from '../../../../../metrics/application/use-case/CreateMetricUseCase';
import {CreateUserUseCase} from '../../../../../Users/application/use-case/CreateUserUseCase'
 import { CreateUserController } from '../../../../../Users/infrastructure/controller/CreateUserController';
// import { IMetricCreate } from '../../../../../metrics/application/use-case/interface/IMetricCreate';
// import { IMetricFindAll } from '../../../../../metrics/application/use-case/interface/IMetricFindAll';
import {IUserCreate} from '../../../../../Users/application/use-case/interface/IUserCreate'
// import { FindAllMetricUseCase } from '../../../../../metrics/application/use-case/FindAllMetricUseCase';
// import { FindAllMetricController } from '../../../../../metrics/infrastructure/controller/FindAllMetricController';

export class Routes {
  public router: Router;
  private versionHealth: VersionHealth;
  private userRepository: UsercRepository = new UsercRepository();

  private createUserUseCase: IUserCreate = new CreateUserUseCase(this.userRepository);
  //  private findAllMetricUseCase: IMetricFindAll = new FindAllMetricUseCase(this.metricRepository);

   private createUserController: CreateUserController;
  // private findAllMetricController: FindAllMetricController;

  constructor() {
    this.router = Router();
    this.versionHealth = new VersionHealth();
     this.createUserController = new CreateUserController(this.createUserUseCase);
    // this.findAllMetricController = new FindAllMetricController(this.findAllMetricUseCase);
  }

  public routes(): Router {
    this.router.get('/health', this.versionHealth.run);
     this.router.post('/Users', this.createUserController.run);
    // this.router.get('/metrics', this.findAllMetricController.run);

    return this.router;
  }
}
