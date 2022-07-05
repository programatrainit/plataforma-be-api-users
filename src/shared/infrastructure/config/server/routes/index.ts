import { Router } from 'express';
import { VersionHealth } from '../../../../../version';
import { MetricRepository } from '../../../../../metrics/infrastructure/persistence/mongoose/MetricRepository';
import { CreateMetricUseCase } from '../../../../../metrics/application/use-case/CreateMetricUseCase';
import { CreateMetricController } from '../../../../../metrics/infrastructure/controller/CreateMetricController';
import { IMetricCreate } from '../../../../../metrics/application/use-case/interface/IMetricCreate';
import { IMetricFindAll } from '../../../../../metrics/application/use-case/interface/IMetricFindAll';
import { FindAllMetricUseCase } from '../../../../../metrics/application/use-case/FindAllMetricUseCase';
import { FindAllMetricController } from '../../../../../metrics/infrastructure/controller/FindAllMetricController';

export class Routes {
  public router: Router;
  private versionHealth: VersionHealth;
  private metricRepository: MetricRepository = new MetricRepository();

  private createMetricUseCase: IMetricCreate = new CreateMetricUseCase(this.metricRepository);
  private findAllMetricUseCase: IMetricFindAll = new FindAllMetricUseCase(this.metricRepository);

  private createMetricController: CreateMetricController;
  private findAllMetricController: FindAllMetricController;

  constructor() {
    this.router = Router();
    this.versionHealth = new VersionHealth();
    this.createMetricController = new CreateMetricController(this.createMetricUseCase);
    this.findAllMetricController = new FindAllMetricController(this.findAllMetricUseCase);
  }

  public routes(): Router {
    this.router.get('/health', this.versionHealth.run);
    this.router.post('/metrics', this.createMetricController.run);
    this.router.get('/metrics', this.findAllMetricController.run);

    return this.router;
  }
}
