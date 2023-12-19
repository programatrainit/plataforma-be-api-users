import { TyOrmBaseRepository } from '../../../shared/infrastructure/persistence/typeORM/typeOrmBaseRepository';

import { RolWriteRepository } from '../../domain/repository/RolWriteRepository';
import { IUrol } from '../../domain/entity/IRol';
import { DataToUpdate, Body } from '../../application/use-case/interface/IURolUpdate';

export class RolRepository extends TyOrmBaseRepository implements RolWriteRepository {
  async updateRol(dataToUpdate: DataToUpdate): Promise<object> {
    const msgDeleteRol = await super.update<Body, string, object>(dataToUpdate.body, dataToUpdate.id);
    return msgDeleteRol;
  }
 
  async deleteRol(id: string): Promise<string> {
    const msgDeleteRol = await super.delete<string, string>(id);
    return msgDeleteRol;
  }

  async createRol(body: IUrol): Promise<string> {
    const createRolInDB = await super.create<IUrol, string>(body);
    return createRolInDB;
  }
}
