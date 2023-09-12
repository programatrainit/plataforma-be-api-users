import { IUser } from '../../../domain/entity/IUser';

export interface IUserFindAll {
  findAll(): Promise<Array<IUser>>;
}
