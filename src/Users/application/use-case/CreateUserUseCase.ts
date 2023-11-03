import { IUser } from '../../domain/entity/IUser';
import { IUserCreate } from './interface/IUserCreate';
import { UserWriteRepository } from '../../domain/repository/UserWriteRepository';

export class CreateUserUseCase implements IUserCreate {
  constructor(private repo: UserWriteRepository) {
    this.repo = repo;
  }

  create(body: IUser): Promise<string> {
    const response = this.repo.createUser(body);
    return response;
  }
}
