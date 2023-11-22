import { IModule } from '../../domain/entity/IModule';
import { IModuleFindAll } from './interface/IModuleFindAll';
import { ModuleReadRepository } from '../../domain/repository/ModuleReadRepository';

export class FindAllModuleUseCase implements IModuleFindAll {
  constructor(private repo: ModuleReadRepository) {
    this.repo = repo;
  }

  findAll(): Promise<Array<IModule>> {
    const response = this.repo.findAllModules();

    return response;
  }
}
