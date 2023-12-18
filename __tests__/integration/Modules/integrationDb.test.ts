import 'reflect-metadata';
import 'source-map-support/register';
import { IModule } from '../../../src/Modules/domain/entity/IModule';
import { ModuleRepository } from '../../../src/Modules/infrastructure/persistence/ModuleRepository';
import { CreateModuleUseCase } from '../../../src/Modules/application/use-case/CreateModuleUseCase';
import { Module } from '../../../src/Modules/infrastructure/persistence/postgres/model/ModuleModel';
import 'dotenv/config';
import { Postgres } from '../../../src/shared/infrastructure/config/postgres/Postgres'

// ======== datos de prueba de IModule ============
const body: IModule = {
  id: '123e4567-e89b-12d3-a456-426614174001',
  name: 'SISTEMAS',
  description: 'Parcticas para las persona de it ',
  created_at: new Date(),
  updated_at: new Date()

}

// ======= configuracion de host =======
// se cambio el host de postgres a localhost

Postgres.db.setOptions({
  host: '127.0.0.1',

})

beforeAll(async () => {
  await Postgres.db.initialize();
});

afterAll(async () => {
  await Postgres.db.destroy();
})

describe('Module integration', () => {
  const createModuleRespose: string = 'record created successfully';
  const moduleRepository = new ModuleRepository(Module);
  const createModuleUseCase = new CreateModuleUseCase(moduleRepository);

  test('create a new module', async () => {
    const result = await createModuleUseCase.create(body);
    expect(result).toBeDefined();
    expect(result).toEqual(createModuleRespose);
    expect(result).not.toBe(null);
  });
});

