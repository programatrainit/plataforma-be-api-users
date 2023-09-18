import { IUser } from '../entity/IUser';

export interface UserWriteRepository {
  createUser(body: IUser): Promise<string>;
  updateUser(body:IUser , id : string ): Promise <Object>;

}
