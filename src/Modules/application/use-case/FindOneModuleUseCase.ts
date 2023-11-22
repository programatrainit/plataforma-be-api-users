import { IModule } from '../../domain/entity/IModule';
import { IModuleFindOne } from './interface/IModuleFindOne';
import { ModuleReadRepository } from '../../domain/repository/ModuleReadRepository';

export class FindOneModuleUseCase implements IModuleFindOne {
  constructor(private repo: ModuleReadRepository) {
    this.repo = repo;
  }

  findOne(id: string): Promise<IModule> {
    const response = this.repo.findOneModule(id);
    return response;
  }
}
