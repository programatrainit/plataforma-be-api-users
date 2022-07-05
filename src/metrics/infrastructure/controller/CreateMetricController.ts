import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { IBaseController } from '../../../shared/infrastructure/controllers/IBaseController';
import { ErrorHandler } from '../../../shared/domain/service/ErrorHandler';
import { IMetricCreate } from '../../application/use-case/interface/IMetricCreate';

export class CreateMetricController implements IBaseController {
  private readonly useCase: IMetricCreate;

  constructor(useCase: IMetricCreate) {
    this.useCase = useCase;
  }

  run = async (req: Request, res: Response): Promise<void> => {
    try {
      const { body } = req;
      log.info({ body });

      const response = await this.useCase.create(body);
      res.status(httpStatus.OK).json(response);
    } catch (error) {
      ErrorHandler.catch(error as Record<any, any>, res);
    }
  };
}
