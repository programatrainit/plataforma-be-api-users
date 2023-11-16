import { Router } from 'express';
import { ModuleRepository } from '../../../../../Modules/infrastructure/persistence/ModuleRepository';
import { CreateModuleUseCase } from '../../../../../Modules/application/use-case/CreateModuleUseCase';
import { FindAllModuleUseCase } from '../../../../../Modules/application/use-case/FindAllModuleUseCase';
import { FindOneModuleUseCase } from '../../../../../Modules/application/use-case/FindOneModuleUseCase';
import { CreateModuleController } from '../../../../../Modules/infrastructure/controllers/CreateModuleController';
import { FindAllModuleController } from '../../../../../Modules/infrastructure/controllers/FindAllModuleController';
import { FindOneModuleController } from '../../../../../Modules/infrastructure/controllers/FindOneModuleController';
import { IModuleCreate } from '../../../../../Modules/application/use-case/interface/IModuleCreate';
import { IModuleFindOne } from '../../../../../Modules/application/use-case/interface/IModuleFindOne';
import { IModuleFindAll } from '../../../../../Modules/application/use-case/interface/IModuleFindAll';
import { Module } from '../../../../../Modules/infrastructure/persistence/postgres/model/ModuleModel';

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

  private createModuleController: CreateModuleController;
  private findAllModuleController: FindAllModuleController;
  private findOneModuleController: FindOneModuleController;

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
  }

  public routes(): Router {
    this.router.post('/modules', this.createModuleController.run);
    this.router.get('/modules', this.findAllModuleController.run);
    this.router.get('/modules/:id', this.findOneModuleController.run);

    return this.router;
  }
}
