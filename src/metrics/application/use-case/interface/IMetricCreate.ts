import { IMetric } from '../../../domain/entity/IMetric';

export interface IMetricCreate {
  create(body: IMetric): Promise<{id: string}>;
}
