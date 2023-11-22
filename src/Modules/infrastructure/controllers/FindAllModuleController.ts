import { Request, Response as Resp } from 'express';
import httpStatus from 'http-status';
import { GET, Path } from 'typescript-rest';
import { Response, Tags } from 'typescript-rest-swagger';
import { IBaseController } from '../../../shared/infrastructure/controllers/IBaseController';
import { ErrorHandler } from '../../../shared/domain/service/ErrorHandler';
import { IModuleFindAll } from '../../application/use-case/interface/IModuleFindAll';
import { IModule } from '../../domain/entity/IModule';

@Path('/modules')
export class FindAllModuleController implements IBaseController {
  private readonly useCase: IModuleFindAll;

  constructor(useCase: IModuleFindAll) {
    this.useCase = useCase;
  }

  run = async (req: Request, res: Resp): Promise<void> => {
    try {
      const response = await this.impl();

      res.status(httpStatus.OK).json(response);
    } catch (error) {
      ErrorHandler.catch(error as Record<any, any>, res);
    }
  };

  @GET
  @Tags('findAllModules')
  @Response<Array<IModule>>(200, 'OK')
  @Response<{ error: string; }>(503, 'SERVICE UNAVAILABLE')
  protected async impl(): Promise<Array<IModule>> {
    return this.useCase.findAll();
  }
}
