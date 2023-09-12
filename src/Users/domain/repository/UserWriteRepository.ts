import { IUser } from '../entity/IUser';

export interface UserWriteRepository {

  createUser(body: IUser): Promise<{id: number}>;
  //updateUser(body:IUser): Promise <>;
  // daleteUser(body:IUser): Promise <>; 
  //
}
