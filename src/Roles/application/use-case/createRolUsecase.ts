import { RolWriteRepository } from '../../domain/repository/RolWriteRepository';
import { IUrol } from '../../domain/entity/IRol';
import { IURolCreate } from './interface/IURolCreate';

export class CreateRolUseCase implements IURolCreate {
  constructor(private respositoryImpl: RolWriteRepository) {
    this.respositoryImpl = respositoryImpl;
  }

  create(UIRol: IUrol): Promise<string> {
    const response = this.respositoryImpl.createRol(UIRol);
    return response;
  }
}
