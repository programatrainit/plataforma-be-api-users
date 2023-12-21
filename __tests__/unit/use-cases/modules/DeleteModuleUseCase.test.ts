import { IModule } from '../../../../src/Modules/domain/entity/IModule';
import { ModuleRepository } from '../../../../src/Modules/infrastructure/persistence/ModuleRepository';
import { BusinessErrorHandler } from '../../../../src/shared/domain/service/BusinessErrorHandler';
import { Exception } from '../../../../src/shared/domain/service/Exception';
import { DeleteModuleUseCase } from '../../../../src/Modules/application/use-case/DeleteModuleUseCases';
import { Module } from '../../../../src/Modules/infrastructure/persistence/postgres/model/ModuleModel';

jest.mock('../../../../src/Modules/infrastructure/persistence/ModuleRepository.ts');

describe('DeleteModuleUseCase', () => {
  const moduleId = '123e4567-e89b-12d3-a456-426614174001';
  const deleteModuleRespose: string = 'record deleted successfully';
  const moduleRepository = new ModuleRepository(Module);
  const deleteModuleUseCase = new DeleteModuleUseCase(moduleRepository);

  let mockModuleRepository: jest.SpyInstance<Promise<string>, [string]>;

  beforeEach(() => {
    mockModuleRepository = jest
      .spyOn(moduleRepository, 'deleteModule')
      .mockResolvedValue(deleteModuleRespose);
  });

  afterEach(() => {
    mockModuleRepository.mockRestore();
  });

  test('delete an existing Module', async () => {
    const result = await deleteModuleUseCase.Delete(moduleId);
    expect(result).toBeDefined();
    expect(result).toEqual(deleteModuleRespose);
    expect(mockModuleRepository).toHaveBeenCalledWith(moduleId);
  });

  test('should return error if the delete is not successful', async () => {
    jest.spyOn(deleteModuleUseCase, 'Delete').mockImplementation(() => {
      throw BusinessErrorHandler.createException(new Error('delete error'));
    });
    try {
      await deleteModuleUseCase.Delete(undefined as unknown as string);
    } catch (err: any) {
      expect(err).toBeInstanceOf(Exception);
      expect(err).toBeInstanceOf(Error);
      expect(err).toBeInstanceOf(Object);
      expect(err.statusCode).toBe(400);
      expect(err.message).toEqual('delete error');
    }
  });
});
