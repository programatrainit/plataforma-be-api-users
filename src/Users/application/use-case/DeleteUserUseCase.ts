import { IUserDelete } from "./interface/IUserDelete";
import { UserWriteRepository } from "../../domain/repository/UserWriteRepository";

export class DeleteUserUseCase implements IUserDelete {
  constructor(private repo: UserWriteRepository) {
    this.repo = repo;
  }

  delete(id: string): Promise<string> {
    const response = this.repo.deleteUser(id);
    return response;
  }
}