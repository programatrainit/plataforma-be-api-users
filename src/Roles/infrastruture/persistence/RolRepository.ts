import { TyOrmBaseRepository } from '../../../shared/infrastructure/persistence/typeORM/typeOrmBaseRepository';

import { RolWriteRepository } from '../../domain/repository/RolWriteRepository';
import { IUrol } from '../../domain/entity/IRol';

export class RolRepository extends TyOrmBaseRepository implements RolWriteRepository {
  async createRol(body: IUrol): Promise<string> {
    const createRolInDB = await super.create<IUrol, string>(body);
    return createRolInDB;
  }
}
