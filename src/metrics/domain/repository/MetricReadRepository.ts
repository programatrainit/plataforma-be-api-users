import { IMetric } from '../entity/IMetric';

export interface MetricReadRepository {
  findAllMetric(): Promise<Array<IMetric>>;
}
