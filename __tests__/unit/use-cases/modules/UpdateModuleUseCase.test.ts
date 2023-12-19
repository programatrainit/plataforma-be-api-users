import { IModule } from '../../../../src/Modules/domain/entity/IModule';
import { ModuleRepository } from '../../../../src/Modules/infrastructure/persistence/ModuleRepository';
import { BusinessErrorHandler } from '../../../../src/shared/domain/service/BusinessErrorHandler';
import { Exception } from '../../../../src/shared/domain/service/Exception';
import { UpdateModuleUseCase } from '../../../../src/Modules/application/use-case/UpdateModuleUseCase';
import { Module } from '../../../../src/Modules/infrastructure/persistence/postgres/model/ModuleModel';

jest.mock('../../../../src/Modules/infrastructure/persistence/ModuleRepository.ts');

describe('RequestUpdateModuleUseCase', () => {

  const body: IModule = {
    id: '123e4567-e89b-12d3-a456-426614174001',
    name: 'SISTEMAS',
    description: " Parcticas para las persona de it , back-end",
    moduleStartDate: new Date("2023-12-20"),
    created_at: new Date(),
    updated_at: new Date()
  }
  let id: string = '123e4567-e89b-12d3-a456-426614174001';

  const updateModuleResponse = {
    "updateUserId": "123e4567-e89b-12d3-a456-426614174001",
    "dateModified": new Date().getFullYear() + "-" + new Date().getMonth() + "-" + new Date().getDate(),
  }
  const moduleRepository = new ModuleRepository(Module);
  const updateModuleUseCase = new UpdateModuleUseCase(moduleRepository);

  let mockModuleRepository: jest.SpyInstance<Promise<any>, [typeof body, typeof id]>;

  beforeEach(() => {
    mockModuleRepository = jest
      .spyOn(moduleRepository, 'updateModule')
      .mockResolvedValue(updateModuleResponse);
  });

  afterEach(() => {
    mockModuleRepository.mockRestore();
  });

  test('update a Module', async () => {
    const result = await updateModuleUseCase.Update(body, id);
    expect(result).toBeDefined();
    expect(result).toEqual(updateModuleResponse);
    expect(mockModuleRepository).toHaveBeenCalled();
    expect(result).not.toBe(null);
  });

  test('should return error if the Update is not success', async () => {
    jest.spyOn(updateModuleUseCase, 'Update').mockImplementation(() => {
      throw BusinessErrorHandler.createException(new Error('throw error'));
    });
    try {
      await updateModuleUseCase.Update(undefined as unknown as IModule, null as unknown as string);
    } catch (err: any) {
      expect(err).toBeInstanceOf(Exception);
      expect(err).toBeInstanceOf(Error);
      expect(err).toBeInstanceOf(Object);
      expect(err.statusCode).toBe(400);
      expect(err.message).toEqual('throw error');
    }
  });
});
