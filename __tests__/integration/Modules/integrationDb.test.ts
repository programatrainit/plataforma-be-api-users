import 'reflect-metadata';
import 'source-map-support/register';
import { IModule } from '../../../src/Modules/domain/entity/IModule';
import { ModuleRepository } from '../../../src/Modules/infrastructure/persistence/ModuleRepository';
import { CreateModuleUseCase } from '../../../src/Modules/application/use-case/CreateModuleUseCase';
import { UpdateModuleUseCase } from '../../../src/Modules/application/use-case/UpdateModuleUseCase';
import { FindAllModuleUseCase } from '../../../src/Modules/application/use-case/FindAllModuleUseCase';
import { FindOneModuleUseCase } from '../../../src/Modules/application/use-case/FindOneModuleUseCase';
import { Module } from '../../../src/Modules/infrastructure/persistence/postgres/model/ModuleModel';
import 'dotenv/config';
import { Postgres } from '../../../src/shared/infrastructure/config/postgres/Postgres'

// ======== datos de prueba de IModule ============
let body: IModule = {
  id: '123e4567-e89b-12d3-a456-426614174001',
  name: 'SISTEMAS',
  description: " Parcticas para las persona de it  ",
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
  const idModule: string = "123e4567-e89b-12d3-a456-426614174001";
  const createModuleResponse: string = 'record created successfully';
  const updateModuleResponse = {
    "updateUserId": "123e4567-e89b-12d3-a456-426614174001",
    "dateModified": new Date().getFullYear() + "-" + new Date().getMonth() + "-" + new Date().getDate(),
  }

  const findOneModuleResponse = {
    "id": "123e4567-e89b-12d3-a456-426614174001",
    "name": "SISTEMAS",
    "description": " Parcticas para las persona de it Back-end",
    "created_at": "2023-12-18",
    "updated_at": "2023-12-18"
  }


  const findAllModuleResponse = [
    {
      "id": "123e4567-e89b-12d3-a456-426614174001",
      "name": "SISTEMAS",
      "description": " Parcticas para las persona de it Back-end",
      "created_at": "2023-12-18",
      "updated_at": "2023-12-18"
    }
  ]
  test('create a new module', async () => {

    const moduleRepository = new ModuleRepository(Module);
    const createModuleUseCase = new CreateModuleUseCase(moduleRepository);

    const result = await createModuleUseCase.create(body);
    expect(result).toBeDefined();
    expect(result).toEqual(createModuleResponse);
    expect(result).not.toBe(null);
  });

  test('update a module', async () => {

    body.description = " Parcticas para las persona de it Back-end";
    const moduleRepository = new ModuleRepository(Module);
    const updateModuleUseCase = new UpdateModuleUseCase(moduleRepository);
    const result = await updateModuleUseCase.Update(body, idModule);

    expect(result).toBeDefined();
    expect(result).toEqual(updateModuleResponse);
    expect(result).not.toBe(null);
  });

  test('find e modules', async () => {
    const moduleRepository = new ModuleRepository(Module);
    const findAllModuleUseCase = new FindAllModuleUseCase(moduleRepository);
    const result = await findAllModuleUseCase.findAll();
    expect(result).toBeDefined();
    expect(result).toEqual(findAllModuleResponse);
    expect(result).not.toBe(null);
  });

  test('find one module', async () => {
    const moduleRepository = new ModuleRepository(Module);
    const findOneModuleUseCase = new FindOneModuleUseCase(moduleRepository);
    const result = await findOneModuleUseCase.findOne(idModule);
    expect(result).toBeDefined();
    expect(result).toEqual(findOneModuleResponse);
    expect(result).not.toBe(null);
  });
});

