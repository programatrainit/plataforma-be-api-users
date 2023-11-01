import { IUser } from '../../domain/entity/IUser';
import { IUserFindAll } from './interface/IUsersFindAll';
// import { IUserFindOne } from './interface/IUsersFindOne';
import {UsersReadRepository} from '../../domain/repository/UsersReadRepository'

export class FindAllUsersUseCase implements IUserFindAll {
  constructor(private repo:UsersReadRepository) {
    this.repo = repo;
  }

  findAll(): Promise<Array<IUser>> {
    const response = this.repo.findAllUsers();

    return response;
  }

  
}
