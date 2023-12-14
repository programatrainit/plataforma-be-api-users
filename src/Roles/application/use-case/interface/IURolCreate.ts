import { IUrol } from '../../../domain/entity/IRol';

export interface IURolCreate {
  create(UIRol:IUrol): Promise<string>;
}
