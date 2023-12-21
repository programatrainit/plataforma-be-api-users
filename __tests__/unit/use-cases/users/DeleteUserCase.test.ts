import { UsersRepository } from '../../../../src/Users/infrastructure/persistence/Postgres/UserRepository';
import { BusinessErrorHandler } from '../../../../src/shared/domain/service/BusinessErrorHandler';
import { Exception } from '../../../../src/shared/domain/service/Exception';
import { DeleteUserUseCase } from '../../../../src/Users/application/use-case/DeleteUserUseCase';
import { User } from '../../../../src/Users/infrastructure/persistence/Postgres/model/UserModel'


jest.mock('../../../../src/Users/infrastructure/persistence/Postgres/UserRepository.ts');

describe('RequestDeleteModuleUseCase', () => {
  const userId = '123e4567-e89b-12d3-a456-426614174001';
  const deleteUserResponse: string = 'user deleted successfully';
  const userRepository = new UsersRepository(User);
  const deleteUserUsecase = new DeleteUserUseCase(userRepository);

  let mockUserRepository: jest.SpyInstance<Promise<string>, [string]>;

  beforeEach(() => {
    mockUserRepository = jest
      .spyOn(userRepository, 'deleteUser')
      .mockResolvedValue(deleteUserResponse);
  });

  afterEach(() => {
    mockUserRepository.mockRestore();
  });

  test('delete an existing User', async () => {
    const result = await deleteUserUsecase.delete(userId);
    expect(result).toBeDefined();
    expect(result).toEqual(deleteUserResponse);
    expect(mockUserRepository).toHaveBeenCalledWith(userId);
  });

  test('should return error if the delete is not successful', async () => {
    jest.spyOn(deleteUserUsecase, 'delete').mockImplementation(() => {
      throw BusinessErrorHandler.createException(new Error('delete error'));
    });
    try {
      await deleteUserUsecase.delete(undefined as unknown as string);
    } catch (err: any) {
      expect(err).toBeInstanceOf(Exception);
      expect(err).toBeInstanceOf(Error);
      expect(err).toBeInstanceOf(Object);
      expect(err.statusCode).toBe(400);
      expect(err.message).toEqual('delete error');
    }
  });
});

