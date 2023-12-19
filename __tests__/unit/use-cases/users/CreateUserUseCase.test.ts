import { IUser } from '../../../../src/Users/domain/entity/IUser';
import { UsersRepository } from '../../../../src/Users/infrastructure/persistence/Postgres/UserRepository';
import { BusinessErrorHandler } from '../../../../src/shared/domain/service/BusinessErrorHandler';
import { Exception } from '../../../../src/shared/domain/service/Exception';
import { CreateUserUseCase } from '../../../../src/Users/application/use-case/CreateUserUseCase';
import { User } from '../../../../src/Users/infrastructure/persistence/Postgres/model/UserModel'

jest.mock('../../../src/Users/infrastructure/persistence/Postgres/UserRepository.ts');

describe('RequestCreateMetricUseCase', () => {
  const body: IUser = {
    id: '123e4567-e89b-12d3-a456-426614174001',
    nombre: 'Maria',
    apellido: 'Gonzalez',
    email: 'maria.Gonzalez@email.com',
    cv_bucket_url: 'https://fake-s3-bucket.s3.amazonaws.com',
    github_url: 'https://github.com/fakeuser',
    linkedin_url: 'https://www.linkedin.com/in/fakeuser',
    created_at: new Date(),
    updated_at: new Date()

  }
  const createUserRespose: string = 'record created successfully';
  const userRepository = new UsersRepository(User);
  const createUserUseCase = new CreateUserUseCase(userRepository);

  let mockUserRepository: jest.SpyInstance<Promise<string>, [typeof body]>;

  beforeEach(() => {
    mockUserRepository = jest
      .spyOn(userRepository, 'createUser')
      .mockResolvedValue(createUserRespose);
  });

  afterEach(() => {
    mockUserRepository.mockRestore();
  });

  test('create a new User', async () => {
    const result = await createUserUseCase.create(body);
    expect(result).toBeDefined();
    expect(result).toEqual(createUserRespose);
    expect(mockUserRepository).toHaveBeenCalled();
    expect(result).not.toBe(null);
  });

  test('should return error if the create is not success', async () => {
    jest.spyOn(createUserUseCase, 'create').mockImplementation(() => {
      throw BusinessErrorHandler.createException(new Error('throw error'));
    });
    try {
      await createUserUseCase.create(undefined as unknown as IUser);
    } catch (err: any) {
      expect(err).toBeInstanceOf(Exception);
      expect(err).toBeInstanceOf(Error);
      expect(err).toBeInstanceOf(Object);
      expect(err.statusCode).toBe(400);
      expect(err.message).toEqual('throw error');
    }
  });
});
