import { IUser } from '../../domain/entity/IUser';
import { IUserFindOne } from './interface/IUsersFindOne';
import {UsersReadRepository} from '../../domain/repository/UsersReadRepository'

export class FindOneUserUseCase implements IUserFindOne {
  constructor(private repo:UsersReadRepository) {
    this.repo = repo;
  }

  findOne(id: string): Promise<IUser> {
    const response = this.repo.findOneUser(id);
    return response;
  }
}