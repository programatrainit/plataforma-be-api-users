import { IMetric } from '../entity/IMetric';

export interface MetricWriteRepository {
  createMetric(body: IMetric): Promise<{id: string}>;
}
