import { IUser } from '../entity/IUser';

export interface MetricReadRepository {
  findAllUsers(): Promise<Array<IUser>>;
  findAUser( id: number): Promise<{user: IUser}>
}
