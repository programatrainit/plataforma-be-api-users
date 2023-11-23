import { IModule } from '../../../domain/entity/IModule';

export interface IModuleUpdate {
  Update(body: IModule, id: string): Promise<object>;
}
