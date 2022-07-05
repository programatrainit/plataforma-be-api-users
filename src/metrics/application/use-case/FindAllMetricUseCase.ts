import { IMetric } from '../../domain/entity/IMetric';
import { IMetricFindAll } from './interface/IMetricFindAll';
import { MetricReadRepository } from '../../domain/repository/MetricReadRepository';

export class FindAllMetricUseCase implements IMetricFindAll {
  constructor(private repo: MetricReadRepository) {
    this.repo = repo;
  }

  findAll(): Promise<Array<IMetric>> {
    const response = this.repo.findAllMetric();

    return response;
  }
}
