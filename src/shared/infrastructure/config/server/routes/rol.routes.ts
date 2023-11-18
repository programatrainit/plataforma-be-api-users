import { Router } from 'express';
import { RolRepository } from '../../../../../Roles/infrastruture/persistence/RolRepository';
import { Rol } from '../../../../../Roles/infrastruture/persistence/postgres/model/RolModel';
import { CreateRolUseCase } from '../../../../../Roles/application/use-case/createRolUsecase';
import { DeleteRolUseCase } from '../../../../../Roles/application/use-case/deleteRolUseCases';
import { UpdateRolUseCase } from '../../../../../Roles/application/use-case/updateRolUseCase';

import { CreateRolController } from '../../../../../Roles/infrastruture/controllers/CreateRolController';
import { DeleteRolController } from '../../../../../Roles/infrastruture/controllers/DeleteRolController';
import { UpdateRolController } from '../../../../../Roles/infrastruture/controllers/UpdateRolController';

export class RolRoutes {
  private router = Router();
  private rolRepository = new RolRepository(Rol);
  private createRolUseCases = new CreateRolUseCase(this.rolRepository);
  private deleteRolUseCases = new DeleteRolUseCase(this.rolRepository);
  private updateRolUseCases = new UpdateRolUseCase(this.rolRepository);

  private createRolcontroller:CreateRolController;
  private deleteRolcontroller:DeleteRolController;
  private updateRolcontroller:UpdateRolController;
  constructor() {
    this.createRolcontroller = new CreateRolController(this.createRolUseCases);
    this.deleteRolcontroller = new DeleteRolController(this.deleteRolUseCases);
    this.updateRolcontroller = new UpdateRolController(this.updateRolUseCases);
  }

  public routes(): Router {
    this.router.post('/rol', this.createRolcontroller.run);
    this.router.delete('/rol', this.deleteRolcontroller.run);
    this.router.put('/rol', this.updateRolcontroller.run);

    return this.router;
  }
}
