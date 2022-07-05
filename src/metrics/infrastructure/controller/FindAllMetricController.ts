import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { IBaseController } from '../../../shared/infrastructure/controllers/IBaseController';
import { ErrorHandler } from '../../../shared/domain/service/ErrorHandler';
import { IMetricFindAll } from '../../application/use-case/interface/IMetricFindAll';

export class FindAllMetricController implements IBaseController {
  private readonly useCase: IMetricFindAll;

  constructor(useCase: IMetricFindAll) {
    this.useCase = useCase;
  }

  run = async (req: Request, res: Response): Promise<void> => {
    try {
      const response = await this.useCase.findAll();

      res.status(httpStatus.OK).json(response);
    } catch (error) {
      ErrorHandler.catch(error as Record<any, any>, res);
    }
  };
}
