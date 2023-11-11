import { Router } from 'express';
import { RolRepository } from '../../../../../Roles/infrastruture/persistence/RolRepository';
import { Rol } from '../../../../../Roles/infrastruture/persistence/postgres/model/RolModel';
import { CreateRolUseCase } from '../../../../../Roles/application/use-case/createRolUsecase';
import { CreateRolController } from '../../../../../Roles/infrastruture/controllers/CreateRolController';

export class RolRoutes {
  private router = Router();
  private rolRepository = new RolRepository(Rol);
  private rolUseCases = new CreateRolUseCase(this.rolRepository);
  private createRolcontroller:CreateRolController;
  constructor() {
    this.createRolcontroller = new CreateRolController(this.rolUseCases);
  }

  public routes(): Router {
    this.router.post('/rol', this.createRolcontroller.run);
    return this.router;
  }
}
