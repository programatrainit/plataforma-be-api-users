import { Request, Response as Resp } from 'express';
import httpStatus from 'http-status';
import { Path, POST } from 'typescript-rest';
import { Response, Tags } from 'typescript-rest-swagger';
import { IBaseController } from '../../../shared/infrastructure/controllers/IBaseController';
import { ErrorHandler } from '../../../shared/domain/service/ErrorHandler';
import { IMetricCreate } from '../../application/use-case/interface/IMetricCreate';
import { IMetric } from '../../domain/entity/IMetric';

@Path('/metrics')
export class CreateMetricController implements IBaseController {
  private readonly useCase: IMetricCreate;

  constructor(useCase: IMetricCreate) {
    this.useCase = useCase;
  }

  run = async (req: Request, res: Resp): Promise<void> => {
    const { body } = req;
    try {
      const response = await this.impl(body);

      res.status(httpStatus.OK).json(response);
    } catch (error) {
      ErrorHandler.catch(error as Record<any, any>, res);
    }
  };

  @POST
  @Tags('Metrics')
  @Response<{id: string}>(200, 'OK')
  @Response<{ error: string; }>(503, 'SERVICE UNAVAILABLE')
  protected async impl(body: IMetric): Promise<{ id: string }> {
    return this.useCase.create(body);
  }
}
