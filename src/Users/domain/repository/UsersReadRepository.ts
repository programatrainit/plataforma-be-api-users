import { IUser } from '../entity/IUser';

export interface UsersReadRepository {
  findAllUsers(): Promise<Array<IUser>>;
  // findAUser( id: number): Promise<{user: IUser}>
}
