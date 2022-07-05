import { MongooseBaseRepository } from '../../../../shared/infrastructure/persistence/mongoose/MongooseBaseRepository';
import MetricSchema from './model/MetricSchema';
import { MetricWriteRepository } from '../../../domain/repository/MetricWriteRepository';
import { MetricReadRepository } from '../../../domain/repository/MetricReadRepository';
import { IMetric } from '../../../domain/entity/IMetric';

export class MetricRepository
  extends MongooseBaseRepository
  implements MetricWriteRepository, MetricReadRepository {
  constructor() {
    super(MetricSchema);
  }

  async createMetric(body: IMetric): Promise<{id: string}> {
    const response = await super.create<IMetric, any>(body);
    const { _id: id } = response;

    return { id };
  }

  async findAllMetric(): Promise<Array<IMetric>> {
    const response = await super.find<any, IMetric>({});

    return response;
  }
}
