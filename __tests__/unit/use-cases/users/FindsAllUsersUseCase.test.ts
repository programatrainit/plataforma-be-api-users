
import { IUser } from '../../../../src/Users/domain/entity/IUser';
import { UsersRepository } from '../../../../src/Users/infrastructure/persistence/Postgres/UserRepository';
import { BusinessErrorHandler } from '../../../../src/shared/domain/service/BusinessErrorHandler';
import { Exception } from '../../../../src/shared/domain/service/Exception';
import { FindAllUsersUseCase } from '../../../../src/Users/application/use-case/FindAllUserUseCase';
import { User } from '../../../../src/Users/infrastructure/persistence/Postgres/model/UserModel';
jest.mock('../../../../src/Users/infrastructure/persistence/Postgres/UserRepository.ts');

describe('RequestFindAllUsersCase', () => {

  const findAllUserResponse = [
    {
      id: '123e4567-e89b-12d3-a456-426614174001',
      nombre: 'Maria',
      apellido: 'Gonzalez',
      email: 'maria.Gonzalez@email.com',
      cv_bucket_url: 'https://fake-s3-bucket.s3.amazonaws.com',
      github_url: 'https://github.com/fakeuser',
      linkedin_url: 'https://www.linkedin.com/in/fakeuser',
      created_at: new Date(),
      updated_at: new Date()

    }]
  const userRepository = new UsersRepository (User);
  const findAllUsersUseCase = new FindAllUsersUseCase(userRepository);

  let mockUserRepository: jest.SpyInstance<Promise<Array<IUser>>, []>;

  beforeEach(() => {
    mockUserRepository = jest
      .spyOn(userRepository, 'findAllUsers')
      .mockResolvedValue(findAllUserResponse);
  });

  afterEach(() => {
    mockUserRepository.mockRestore();
  });

  test('find all Users', async () => {
    const result = await findAllUsersUseCase.findAll();
    expect(result).toBeDefined();
    expect(result).toEqual(findAllUserResponse);
    expect( mockUserRepository).toHaveBeenCalled();
    expect(result).not.toBe(null);
  });

  test('should return error if the find all is not success', async () => {
    jest.spyOn(findAllUsersUseCase, 'findAll').mockImplementation(() => {
      throw BusinessErrorHandler.createException(new Error('throw error'));
    });
    try {
      await findAllUsersUseCase.findAll();
    } catch (err: any) {
      expect(err).toBeInstanceOf(Exception);
      expect(err).toBeInstanceOf(Error);
      expect(err).toBeInstanceOf(Object);
      expect(err.statusCode).toBe(400);
      expect(err.message).toEqual('throw error');
    }
  });
});

