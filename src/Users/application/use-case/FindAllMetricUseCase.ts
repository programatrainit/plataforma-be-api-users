import { IUser } from '../../domain/entity/IUser';
import { IMetricFindAll } from './interface/IMetricFindAll';
import { MetricReadRepository } from '../../domain/repository/MetricReadRepository';

export class FindAllMetricUseCase implements IMetricFindAll {
  constructor(private repo: MetricReadRepository) {
    this.repo = repo;
  }

  findAll(): Promise<Array<IUser>> {
    const response = this.repo.findAllUsers();

    return response;
  }
}
