import { IUser } from '../entity/IUser';

export interface UserWriteRepository {
  createUser(body: IUser): Promise<{id: number}>;
  //update 
  // dalete 
  //
}
