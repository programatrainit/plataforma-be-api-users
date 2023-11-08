import { Router } from 'express';
import { ModuleRepository } from '../../../../../Modules/infrastructure/persistence/ModuleRepository';
import { CreateModuleUseCase } from '../../../../../Modules/application/use-case/ CreateModuleUseCase';
import { CreateModuleController } from '../../../../../Modules/infrastructure/controllers/CreateModuleController';
import { IModuleCreate } from '../../../../../Modules/application/use-case/interface/ IModuleCreate';
import { Module } from '../../../../../Modules/infrastructure/persistence/postgres/model/ModuleModel';

export class ModuleRoutes {
  public router: Router;
  private moduleRepository: ModuleRepository = new ModuleRepository(Module);
  private createModuleUseCase: IModuleCreate = new CreateModuleUseCase(
    this.moduleRepository,
  );

  private createModuleController: CreateModuleController;

  constructor() {
    this.router = Router();
    this.createModuleController = new CreateModuleController(
      this.createModuleUseCase,
    );
  }

  public routes(): Router {
    this.router.post('/modules', this.createModuleController.run);

    return this.router;
  }
}
