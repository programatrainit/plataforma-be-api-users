import { IModule } from '../../../domain/entity/ IModule';

export interface IModuleCreate {
  create(body: IModule): Promise<string>;
}
