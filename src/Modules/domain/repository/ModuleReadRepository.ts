import { IModule } from '../entity/IModule';

export interface ModuleReadRepository {
  findAllModules(): Promise<Array<IModule>>;
  findOneModule(id: string): Promise<IModule>;
}
