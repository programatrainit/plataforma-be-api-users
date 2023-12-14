import { IUser } from '../entity/IUser';

export interface UsersReadRepository {
  findAllUsers(): Promise<Array<IUser>>;
  findOneUser(id: string): Promise<IUser>
}
