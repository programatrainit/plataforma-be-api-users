import { info } from 'winston';
import { TyOrmBaseRepository } from '../../../../shared/infrastructure/persistence/typeORM/typeOrmBaseRepository';
import { UserWriteRepository } from '../../../domain/repository/UserWriteRepository';
import { UsersReadRepository } from '../../../domain/repository/UsersReadRepository';
import { IUser } from 'Users/domain/entity/IUser';

export class UsersRepository
  extends TyOrmBaseRepository
  implements UserWriteRepository, UsersReadRepository {

// falta por configurar el dto
  async createUser<v>(body: IUser): Promise<string> {
    
    const response = await super.create<IUser,string>(body);
    log.info(`funcion de user repository${response}`)
    return response;
  }

  async findAllUsers(): Promise<Array<IUser>> {
    const response = await super.find<any, IUser>();

    return response;
  }
}
