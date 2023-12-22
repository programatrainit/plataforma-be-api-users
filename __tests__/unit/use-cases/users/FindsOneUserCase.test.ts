
import { IUser } from '../../../../src/Users/domain/entity/IUser';
import { UsersRepository } from '../../../../src/Users/infrastructure/persistence/Postgres/UserRepository';
import { BusinessErrorHandler } from '../../../../src/shared/domain/service/BusinessErrorHandler';
import { Exception } from '../../../../src/shared/domain/service/Exception';
import { FindOneUserUseCase} from '../../../../src/Users/application/use-case/FindOneUserUseCase';
import { User } from '../../../../src/Users/infrastructure/persistence/Postgres/model/UserModel';

jest.mock('../../../../src/Users/infrastructure/persistence/Postgres/UserRepository.ts');

describe('RequestFindOneUserUseCase', () => {
  let idFind: string = '123e4567-e89b-12d3-a456-426614174001';

  const findOneUserResponse =
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

  };
  const userRepository = new UsersRepository (User);
  const findOneUserUseCase = new FindOneUserUseCase(userRepository);

  let mockUserRepository: jest.SpyInstance<Promise<IUser>, [typeof idFind]>;

  beforeEach(() => {
    mockUserRepository = jest
      .spyOn(userRepository, 'findOneUser')
      .mockResolvedValue(findOneUserResponse);
  });

  afterEach(() => {
    mockUserRepository.mockRestore();
  });

  test('find one User', async () => {
    const result = await findOneUserUseCase.findOne(idFind);
    expect(result).toBeDefined();
    expect(result).toEqual(findOneUserResponse);
    expect(mockUserRepository).toHaveBeenCalled();
    expect(result).not.toBe(null);
  });

  test('should return error if the find one is not success', async () => {
    jest.spyOn(findOneUserUseCase, 'findOne').mockImplementation(() => {
      throw BusinessErrorHandler.createException(new Error('throw error'));
    });
    try {
      await findOneUserUseCase.findOne(undefined as unknown as string);
    } catch (err: any) {
      expect(err).toBeInstanceOf(Exception);
      expect(err).toBeInstanceOf(Error);
      expect(err).toBeInstanceOf(Object);
      expect(err.statusCode).toBe(400);
      expect(err.message).toEqual('throw error');
    }
  });
});
