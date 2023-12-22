
import { IModule } from '../../../../src/Modules/domain/entity/IModule';
import { ModuleRepository } from '../../../../src/Modules/infrastructure/persistence/ModuleRepository';
import { BusinessErrorHandler } from '../../../../src/shared/domain/service/BusinessErrorHandler';
import { Exception } from '../../../../src/shared/domain/service/Exception';
import { CreateModuleUseCase } from '../../../../src/Modules/application/use-case/CreateModuleUseCase';
import { Module } from '../../../../src/Modules/infrastructure/persistence/postgres/model/ModuleModel';

jest.mock('../../../../src/Modules/infrastructure/persistence/ModuleRepository.ts');

describe('RequestCreateModuleUseCase', () => {

  const body: IModule = {
    id: '123e4567-e89b-12d3-a456-426614174001',
    name: 'SISTEMAS',
    description: " Parcticas para las persona de it  ",
    moduleStartDate: new Date("2023-12-20"),
    status: true,
    created_at: new Date(),
    updated_at: new Date()
  }
  const createModuleRespose: string = 'record created successfully';
  const moduleRepository = new ModuleRepository(Module);
  const createModuleUseCase = new CreateModuleUseCase(moduleRepository);

  let mockModuleRepository: jest.SpyInstance<Promise<string>, [typeof body]>;

  beforeEach(() => {
    mockModuleRepository = jest
      .spyOn(moduleRepository, 'createModule')
      .mockResolvedValue(createModuleRespose);
  });

  afterEach(() => {
    mockModuleRepository.mockRestore();
  });

  test('create a new Module', async () => {
    const result = await createModuleUseCase.create(body);
    expect(result).toBeDefined();
    expect(result).toEqual(createModuleRespose);
    expect(mockModuleRepository).toHaveBeenCalled();
    expect(result).not.toBe(null);
  });

  test('should return error if the create is not success', async () => {
    jest.spyOn(createModuleUseCase, 'create').mockImplementation(() => {
      throw BusinessErrorHandler.createException(new Error('throw error'));
    });
    try {
      await createModuleUseCase.create(undefined as unknown as IModule);
    } catch (err: any) {
      expect(err).toBeInstanceOf(Exception);
      expect(err).toBeInstanceOf(Error);
      expect(err).toBeInstanceOf(Object);
      expect(err.statusCode).toBe(400);
      expect(err.message).toEqual('throw error');
    }
  });
});
