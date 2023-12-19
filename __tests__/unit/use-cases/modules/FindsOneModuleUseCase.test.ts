
import { IModule } from '../../../../src/Modules/domain/entity/IModule';
import { ModuleRepository } from '../../../../src/Modules/infrastructure/persistence/ModuleRepository';
import { BusinessErrorHandler } from '../../../../src/shared/domain/service/BusinessErrorHandler';
import { Exception } from '../../../../src/shared/domain/service/Exception';
import { FindOneModuleUseCase } from '../../../../src/Modules/application/use-case/FindOneModuleUseCase';
import { Module } from '../../../../src/Modules/infrastructure/persistence/postgres/model/ModuleModel';

jest.mock('../../../../src/Modules/infrastructure/persistence/ModuleRepository.ts');

describe('RequestFindOneModuleUseCase', () => {


  let idFind: string = '123e4567-e89b-12d3-a456-426614174001';
  const findOneModuleResponse =
  {
    id: '123e4567-e89b-12d3-a456-426614174001',
    name: 'SISTEMAS',
    description: " Parcticas para las persona de it  ",
    moduleStartDate: new Date("2023-12-20"),
    created_at: new Date(),
    updated_at: new Date()

  };
  const moduleRepository = new ModuleRepository(Module);
  const findOneModuleUseCase = new FindOneModuleUseCase(moduleRepository);

  let mockModuleRepository: jest.SpyInstance<Promise<IModule>, [typeof idFind]>;

  beforeEach(() => {
    mockModuleRepository = jest
      .spyOn(moduleRepository, 'findOneModule')
      .mockResolvedValue(findOneModuleResponse);
  });

  afterEach(() => {
    mockModuleRepository.mockRestore();
  });

  test('find one Modules', async () => {
    const result = await findOneModuleUseCase.findOne(idFind);
    expect(result).toBeDefined();
    expect(result).toEqual(findOneModuleResponse);
    expect(mockModuleRepository).toHaveBeenCalled();
    expect(result).not.toBe(null);
  });

  test('should return error if the find one is not success', async () => {
    jest.spyOn(findOneModuleUseCase, 'findOne').mockImplementation(() => {
      throw BusinessErrorHandler.createException(new Error('throw error'));
    });
    try {
      await findOneModuleUseCase.findOne(undefined as unknown as string);
    } catch (err: any) {
      expect(err).toBeInstanceOf(Exception);
      expect(err).toBeInstanceOf(Error);
      expect(err).toBeInstanceOf(Object);
      expect(err.statusCode).toBe(400);
      expect(err.message).toEqual('throw error');
    }
  });
});
