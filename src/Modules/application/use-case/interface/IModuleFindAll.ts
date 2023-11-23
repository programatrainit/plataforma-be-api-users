import { IModule } from '../../../domain/entity/IModule';

export interface IModuleFindAll {
  findAll(): Promise<Array<IModule>>;
}
