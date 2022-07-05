import { Router } from 'express';
import { VersionHealth } from '../../../../../version';
import { UserRepository } from '../../../../../metrics/infrastructure/persistence/mongoose/UserRepository';
import { CreateUserUseCase } from '../../../../../metrics/application/use-case/CreateUserUseCase';
import { CreateUserController } from '../../../../../metrics/infrastructure/controller/CreateUserController';

export class Routes {
  public router: Router;
  private versionHealth: VersionHealth;


  constructor() {
    this.router = Router();
    this.versionHealth = new VersionHealth();
  }

  public routes(): Router {
    this.router.get('/health', this.versionHealth.run);

    return this.router;
  }
}
