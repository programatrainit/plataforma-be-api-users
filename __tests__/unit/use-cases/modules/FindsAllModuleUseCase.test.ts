import { IModule } from '../../../../src/Modules/domain/entity/IModule';
import { ModuleRepository } from '../../../../src/Modules/infrastructure/persistence/ModuleRepository';
import { BusinessErrorHandler } from '../../../../src/shared/domain/service/BusinessErrorHandler';
import { Exception } from '../../../../src/shared/domain/service/Exception';
import { FindAllModuleUseCase } from '../../../../src/Modules/application/use-case/FindAllModuleUseCase';
import { Module } from '../../../../src/Modules/infrastructure/persistence/postgres/model/ModuleModel';

jest.mock('../../../../src/Modules/infrastructure/persistence/ModuleRepository.ts');

describe('RequestFindAllModuleUseCase', () => {


  const findAllModuleResponse = [
    {
      id: '123e4567-e89b-12d3-a456-426614174001',
      name: 'SISTEMAS',
      description: " Parcticas para las persona de it  ",
      moduleStartDate: new Date("2023-12-20"),
      status: true,
      created_at: new Date(),
      updated_at: new Date()

    }]
  const moduleRepository = new ModuleRepository(Module);
  const findAllModuleUseCase = new FindAllModuleUseCase(moduleRepository);

  let mockModuleRepository: jest.SpyInstance<Promise<Array<IModule>>, []>;

  beforeEach(() => {
    mockModuleRepository = jest
      .spyOn(moduleRepository, 'findAllModules')
      .mockResolvedValue(findAllModuleResponse);
  });

  afterEach(() => {
    mockModuleRepository.mockRestore();
  });

  test('find all Modules', async () => {
    const result = await findAllModuleUseCase.findAll();
    expect(result).toBeDefined();
    expect(result).toEqual(findAllModuleResponse);
    expect(mockModuleRepository).toHaveBeenCalled();
    expect(result).not.toBe(null);
  });

  test('should return error if the find all is not success', async () => {
    jest.spyOn(findAllModuleUseCase, 'findAll').mockImplementation(() => {
      throw BusinessErrorHandler.createException(new Error('throw error'));
    });
    try {
      await findAllModuleUseCase.findAll();
    } catch (err: any) {
      expect(err).toBeInstanceOf(Exception);
      expect(err).toBeInstanceOf(Error);
      expect(err).toBeInstanceOf(Object);
      expect(err.statusCode).toBe(400);
      expect(err.message).toEqual('throw error');
    }
  });
});
