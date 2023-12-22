import { ModuleWriteRepository } from '../../domain/repository/ModuleWriteRepository';
import { IModuleDelete } from './interface/IModulleDelete';

export class DeleteModuleUseCase implements IModuleDelete {
  constructor(private repo: ModuleWriteRepository) {
    this.repo = repo;
  }

  Delete(id: string): Promise<string> {
    const response = this.repo.deleteModule(id);
    return response;
  }
}
