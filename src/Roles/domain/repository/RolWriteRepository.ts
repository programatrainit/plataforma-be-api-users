import { IUrol } from '../entity/IRol';

export interface RolWriteRepository {
  createRol (body: IUrol): Promise<string>;

}
