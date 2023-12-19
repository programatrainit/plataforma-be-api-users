import { DataToUpdate } from '../../application/use-case/interface/IURolUpdate';
import { IUrol } from '../entity/IRol';

export interface RolWriteRepository {
  createRol (body: IUrol): Promise<string>;
  deleteRol (id:string): Promise<string>;
  updateRol (dataToUpdate:DataToUpdate): Promise<object>;
}
