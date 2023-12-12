/*import { IMetric } from '../../../src/metrics/domain/entity/IMetric';
import { MetricRepository } from '../../../src/metrics/infrastructure/persistence/mongoose/MetricRepository';
import { BusinessErrorHandler } from '../../../src/shared/domain/service/BusinessErrorHandler';
import { Exception } from '../../../src/shared/domain/service/Exception';
import { FindAllMetricUseCase } from '../../../src/metrics/application/use-case/FindAllMetricUseCase';

jest.mock('../../../src/metrics/infrastructure/persistence/mongoose/MetricRepository');

describe('RequestFindAllMetricUseCase', () => {
  const findAllMetricResponse: Array<IMetric> =
    [
      { name: 'Hector Minguez', value: '123456789' },
      { name: 'Hector Minguez', value: '1234567890' },
    ];

  const metricRepository = new MetricRepository();
  const findAllMetricUseCase = new FindAllMetricUseCase(metricRepository);

  let mockMetricRepository: jest.SpyInstance<Promise<Array<IMetric>>, []>;

  beforeEach(() => {
    mockMetricRepository = jest
      .spyOn(metricRepository, 'findAllMetric')
      .mockResolvedValue(findAllMetricResponse);
  });

  afterEach(() => {
    mockMetricRepository.mockRestore();
  });

  test('find all metric registry ', async () => {
    const result = await findAllMetricUseCase.findAll();
    expect(result).toBeDefined();
    expect(result).toEqual(findAllMetricResponse);
    expect(mockMetricRepository).toHaveBeenCalled();
    expect(result).not.toBe(null);
  });

  test('should return error if the create is not success', async () => {
    jest.spyOn(findAllMetricUseCase, 'findAll').mockImplementation(() => {
      throw BusinessErrorHandler.createException(new Error('throw error'));
    });
    try {
      await findAllMetricUseCase.findAll();
    } catch (err: any) {
      expect(err).toBeInstanceOf(Exception);
      expect(err).toBeInstanceOf(Error);
      expect(err).toBeInstanceOf(Object);
      expect(err.statusCode).toBe(400);
      expect(err.message).toEqual('throw error');
    }
  });
});*/
