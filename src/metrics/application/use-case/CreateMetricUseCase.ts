import { IMetric } from '../../domain/entity/IMetric';
import { IMetricCreate } from './interface/IMetricCreate';
import { MetricWriteRepository } from '../../domain/repository/MetricWriteRepository';

export class CreateMetricUseCase implements IMetricCreate {
  constructor(private repo: MetricWriteRepository) {
    this.repo = repo;
  }

  create(body: IMetric): Promise<{id: string}> {
    const response = this.repo.createMetric(body);

    return response;
  }
}
