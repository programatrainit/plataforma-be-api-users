import { TyOrmBaseRepository } from '../../../../shared/infrastructure/persistence/typeORM/typeOrmBaseRepository';
import { UserWriteRepository } from '../../../domain/repository/UserWriteRepository';
import { MetricReadRepository } from '../../../domain/repository/MetricReadRepository';
import { IUser } from 'Users/domain/entity/IUser';



export class UsercRepository
  extends TyOrmBaseRepository
  implements UserWriteRepository {


  async createUser(body: IUser): Promise<{id: number}> {
    
    const response = await super.create<IUser>(body);
    const { id: id } = response;

    return { id};
  }

  async findAllUsers(): Promise<Array<IUser>> {
    const response = await super.find<IUser>();

    return response;
  }

  // async findAUser(id: number): Promise<{ user: IUser; }> {
  //   //logic
  //   return response
  // }

  async updateUser(id: number, updatedUserData: IUser): Promise<void> {
    //Escribir la logica
  }

  async deleteUser(id: number): Promise<void> {
    //aqui tambien bro jeje
  }
}
