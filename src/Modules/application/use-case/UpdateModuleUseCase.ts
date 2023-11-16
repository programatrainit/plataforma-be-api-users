import { IModule } from '../../domain/entity/IModule';
import { IModuleUpdate } from './interface/IModuleUpdate';
import { ModuleWriteRepository } from '../../domain/repository/ModuleWriteRepository';

export class UpdateModuleUseCase implements IModuleUpdate {
  private _repo: ModuleWriteRepository;
  constructor(repo: ModuleWriteRepository) {
    this._repo = repo;
  }

  Update(body: IModule, id: string): Promise<object> {
    const response = this._repo.updateModule(body, id);

    return response;
  }
}
