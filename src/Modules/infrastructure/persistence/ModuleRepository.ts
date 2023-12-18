import { TyOrmBaseRepository } from '../../../shared/infrastructure/persistence/typeORM/typeOrmBaseRepository';
import { ModuleWriteRepository } from '../../domain/repository/ModuleWriteRepository';
import { ModuleReadRepository } from '../../domain/repository/ModuleReadRepository';
import { IModule } from '../../domain/entity/IModule';
export class ModuleRepository

  extends TyOrmBaseRepository
  implements ModuleWriteRepository, ModuleReadRepository {
  // falta por configurar el dto
  async createModule(body: IModule): Promise<string> {
    const response = await super.create<IModule, string>(body);
    //log.info(`funcion de user repository${response}`);
    return response;
  }

  async findAllModules(): Promise<Array<IModule>> {
    const response = await super.find<any, IModule>();

    return response;
  }

  async updateModule(body: IModule, id: string): Promise<any> {
    const response = await super.update<IModule, string, object>(body, id);

    return response;
  }

  async findOneModule(id: string): Promise<IModule> {
    const response = await super.findOne<string, IModule>(id);
    if (response === undefined) {
      throw new Error(`User con ID ${id} no encontrado`);
    }

    // log.info(`Funcion UserRepository ${JSON.stringify(response)}`);
    return response;
  }

  async deleteModule(id: string): Promise<string> {
    const response = await super.delete<string, string>(id);
    if (response === undefined) {
      throw new Error(`User con ID ${id} no encontrado`);
    }

    return response;
  }
}
