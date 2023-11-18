import { RolWriteRepository } from '../../domain/repository/RolWriteRepository';
import { IUrolUpdate, DataToUpdate } from './interface/IURolUpdate';

export class UpdateRolUseCase implements IUrolUpdate {
  constructor(private respositoryImpl:RolWriteRepository) {
    this.respositoryImpl = respositoryImpl;
  }

  async update(dataToUpdate: DataToUpdate): Promise<object> {
    const response = this.respositoryImpl.updateRol(dataToUpdate);
    return response;
  }
}
