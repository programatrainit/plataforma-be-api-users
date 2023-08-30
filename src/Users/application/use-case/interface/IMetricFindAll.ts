import { IMetric } from '../../../domain/entity/IMetric';

export interface IMetricFindAll {
  findAll(): Promise<Array<IMetric>>;
}
