import { IUser } from '../entity/IUser';

export interface UserWriteRepository {

  createUser(body: IUser): Promise<{id: number}>;

  updateUser(id: number, updatedUserData: IUser): Promise<void>;

  deleteUser(id: number): Promise<void>;
  
  //update 
  // dalete 
  //
}
