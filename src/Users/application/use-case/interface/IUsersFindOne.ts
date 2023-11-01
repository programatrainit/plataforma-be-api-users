import { IUser } from "Users/domain/entity/IUser";

export interface IUserFindOne {
  findOne(id: string): Promise<IUser>;
}