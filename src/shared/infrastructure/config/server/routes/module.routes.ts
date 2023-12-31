import { Router } from 'express';
import { ModuleRepository } from '../../../../../Modules/infrastructure/persistence/ModuleRepository';
import { CreateModuleUseCase } from '../../../../../Modules/application/use-case/CreateModuleUseCase';
import { FindAllModuleUseCase } from '../../../../../Modules/application/use-case/FindAllModuleUseCase';
import { FindOneModuleUseCase } from '../../../../../Modules/application/use-case/FindOneModuleUseCase';
import { UpdateModuleUseCase } from '../../../../../Modules/application/use-case/UpdateModuleUseCase';
import { CreateModuleController } from '../../../../../Modules/infrastructure/controllers/CreateModuleController';
import { FindAllModuleController } from '../../../../../Modules/infrastructure/controllers/FindAllModuleController';
import { FindOneModuleController } from '../../../../../Modules/infrastructure/controllers/FindOneModuleController';
import { UpdateModuleConstroller } from '../../../../../Modules/infrastructure/controllers/UpdateModuleController';
import { IModuleCreate } from '../../../../../Modules/application/use-case/interface/IModuleCreate';
import { IModuleFindOne } from '../../../../../Modules/application/use-case/interface/IModuleFindOne';
import { IModuleFindAll } from '../../../../../Modules/application/use-case/interface/IModuleFindAll';
import { IModuleUpdate } from '../../../../../Modules/application/use-case/interface/IModuleUpdate';
import { Module } from '../../../../../Modules/infrastructure/persistence/postgres/model/ModuleModel';
import { IModuleDelete } from '../../../../../Modules/application/use-case/interface/IModulleDelete';
import { DeleteModuleUseCase } from '../../../../../Modules/application/use-case/DeleteModuleUseCases';
import { DeleteModuleController } from '../../../../../Modules/infrastructure/controllers/DeleteModuleController';

export class ModuleRoutes {
  public router: Router;
  private moduleRepository: ModuleRepository = new ModuleRepository(Module);
  private createModuleUseCase: IModuleCreate = new CreateModuleUseCase(
    this.moduleRepository,
  );

  private findAllModuleUseCase: IModuleFindAll = new FindAllModuleUseCase(
    this.moduleRepository,
  );

  private findOneModuleUseCase: IModuleFindOne = new FindOneModuleUseCase(
    this.moduleRepository
  );

  private updateModuleUseCase: IModuleUpdate = new UpdateModuleUseCase(
    this.moduleRepository
  );

  private deleteModuleUseCase: IModuleDelete = new DeleteModuleUseCase(
    this.moduleRepository,
  );

  private createModuleController: CreateModuleController;
  private findAllModuleController: FindAllModuleController;
  private findOneModuleController: FindOneModuleController;
  private updateModuleController: UpdateModuleConstroller;
  private deleteModuleController: DeleteModuleController;

  constructor() {
    this.router = Router();
    this.createModuleController = new CreateModuleController(
      this.createModuleUseCase,
    );
    this.findAllModuleController = new FindAllModuleController(
      this.findAllModuleUseCase,
    );
    this.findOneModuleController = new FindOneModuleController(
      this.findOneModuleUseCase
    );
    this.updateModuleController = new UpdateModuleConstroller(
      this.updateModuleUseCase
    );
    this.deleteModuleController = new DeleteModuleController(
      this.deleteModuleUseCase
    );
  }

  public routes(): Router {
    this.router.post('/modules', this.createModuleController.run);
    this.router.get('/modules', this.findAllModuleController.run);
    this.router.delete('/modules', this.deleteModuleController.run);
    this.router.put('/modules', this.updateModuleController.run);
    this.router.get('/modules/:id', this.findOneModuleController.run);

    return this.router;
  }
}
