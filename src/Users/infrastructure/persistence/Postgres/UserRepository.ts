import { TyOrmBaseRepository } from '../../../../shared/infrastructure/persistence/typeORM/typeOrmBaseRepository';
import { UserWriteRepository } from '../../../domain/repository/UserWriteRepository';
import { UsersReadRepository } from '../../../domain/repository/UsersReadRepository';
import { IUser } from '../../../domain/entity/IUser';

export class UsersRepository
  extends TyOrmBaseRepository
  implements UserWriteRepository, UsersReadRepository {
  // falta por configurar el dto
  async createUser<v>(body: IUser): Promise<string> {
    const response = await super.create<IUser, string>(body);
    log.info(`funcion de user repository${response}`);
    return response;
  }

  async findAllUsers(): Promise<Array<IUser>> {
    const response = await super.find<any, IUser>();

    return response;
  }

  async updateUser(body: IUser, id: string): Promise<Object> {
    const response = await super.update<IUser, string, object>(body, id);

    return response;
  }

  async findOneUser(id: string): Promise<IUser> {
    const response = await super.findOne<string, IUser>(id);
    if (response === undefined) {
      throw new Error(`User con ID ${id} no encontrado`);
    }

    // log.info(`Funcion UserRepository ${JSON.stringify(response)}`);
    return response;
  }

  async deleteUser(id: string): Promise<string> {
    const response = await super.delete<string, string>(id);
    if (response === undefined) {
      throw new Error(`User con ID ${id} no encontrado`);
    }

    return response;
  }
}
