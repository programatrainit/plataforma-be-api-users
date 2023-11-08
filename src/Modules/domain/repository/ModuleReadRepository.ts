import { IModule } from '../entity/ IModule';

export interface UsersReadRepository {
  findAllUsers(): Promise<Array<IModule>>;
  findOneUser(id: string): Promise<IModule>;
}
