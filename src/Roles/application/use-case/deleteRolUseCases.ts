import { RolWriteRepository } from '../../domain/repository/RolWriteRepository';
import { IURolDelete } from './interface/IURolDelete';

export class DeleteRolUseCase implements IURolDelete {
  constructor(private respositoryImpl: RolWriteRepository) {
    this.respositoryImpl = respositoryImpl;
  }

  delete(id: string): Promise<string> {
    const response = this.respositoryImpl.deleteRol(id);
    return response;
  }
}
