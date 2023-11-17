import { IModule } from '../entity/IModule';

export interface ModuleWriteRepository {
  createModule(body: IModule): Promise<string>; // Crea un módulo
  updateModule(body: IModule, id: string): Promise<object>;
  deleteModule(id: string): Promise<string>;
}
