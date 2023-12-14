import { IUser } from '../../../domain/entity/IUser';

export interface IUserFindOne {
  findOne(id: string): Promise<IUser>;
}
