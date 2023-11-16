import { IModule } from '../../../domain/entity/IModule';

export interface IModuleFindOne {
  findOne(id: string): Promise<IModule>;
}
