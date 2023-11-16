import { IModule } from '../../domain/entity/IModule';
import { IModuleCreate } from './interface/IModuleCreate';
import { ModuleWriteRepository } from '../../domain/repository/ModuleWriteRepository';

export class CreateModuleUseCase implements IModuleCreate {
  constructor(private repo: ModuleWriteRepository) {
    this.repo = repo;
  }

  create(body: IModule): Promise<string> {
    const response = this.repo.createModule(body);
    return response;
  }
}
