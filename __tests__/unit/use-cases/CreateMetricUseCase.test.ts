import { IMetric } from '../../../src/metrics/domain/entity/IMetric';
import { MetricRepository } from '../../../src/metrics/infrastructure/persistence/mongoose/MetricRepository';
import { BusinessErrorHandler } from '../../../src/shared/domain/service/BusinessErrorHandler';
import { Exception } from '../../../src/shared/domain/service/Exception';
import { CreateMetricUseCase } from '../../../src/metrics/application/use-case/CreateMetricUseCase';

jest.mock('../../../src/metrics/infrastructure/persistence/mongoose/MetricRepository');

describe('RequestCreateMetricUseCase', () => {
  const body: IMetric = { name: 'Hector Minguez', value: '123456789' };
  const createMetricResponse: { id: string } = { id: '62c484b846bc49eb403687f5' };
  const metricRepository = new MetricRepository();
  const createMetricUseCase = new CreateMetricUseCase(metricRepository);

  let mockMetricRepository: jest.SpyInstance<Promise<{ id: string }>, [typeof body]>;

  beforeEach(() => {
    mockMetricRepository = jest
      .spyOn(metricRepository, 'createMetric')
      .mockResolvedValue(createMetricResponse);
  });

  afterEach(() => {
    mockMetricRepository.mockRestore();
  });

  test('create a new metric', async () => {
    const result = await createMetricUseCase.create(body);
    expect(result).toBeDefined();
    expect(result).toEqual(createMetricResponse);
    expect(mockMetricRepository).toHaveBeenCalled();
    expect(result).not.toBe(null);
  });

  test('should return error if the create is not success', async () => {
    jest.spyOn(createMetricUseCase, 'create').mockImplementation(() => {
      throw BusinessErrorHandler.createException(new Error('throw error'));
    });
    try {
      await createMetricUseCase.create(undefined as unknown as IMetric);
    } catch (err: any) {
      expect(err).toBeInstanceOf(Exception);
      expect(err).toBeInstanceOf(Error);
      expect(err).toBeInstanceOf(Object);
      expect(err.statusCode).toBe(400);
      expect(err.message).toEqual('throw error');
    }
  });
});
