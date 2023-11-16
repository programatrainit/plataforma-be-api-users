import { Request, Response as Resp } from 'express';
import httpStatus from 'http-status';
import { GET, Path } from 'typescript-rest';
import { Response, Tags } from 'typescript-rest-swagger';
import { IBaseController } from '../../../shared/infrastructure/controllers/IBaseController';
import { ErrorHandler } from '../../../shared/domain/service/ErrorHandler';
import { IModuleFindOne } from '../../application/use-case/interface/IModuleFindOne';
import { IModule } from '../../domain/entity/IModule';

@Path('/modules')
export class FindOneModuleController implements IBaseController {
  private readonly usecase: IModuleFindOne;

  constructor(usecase: IModuleFindOne) {
    this.usecase = usecase;
  }

  run = async (req: Request, res: Resp): Promise<void> => {
    const { id } = req.params;

    try {
      const response = await this.impl(id);
      log.info(`Controller de FindOne impl ${JSON.stringify(response)}`);
      res.status(httpStatus.OK).json(response);
    } catch (error) {
      ErrorHandler.catch(error as Record<any, any>, res);
    }
  };

  @GET
  @Path('/:id')
  @Tags('findOneModule')
  @Response<IModule>(200, 'OK')
  @Response<{ error: string }>(503, 'SERVICE UNAVAILABLE')
  protected async impl(id: string): Promise<IModule> {
    const user = await this.usecase.findOne(id);

    // Agregar validador si no se encuentra al usuario.
    log.info(`Controller de FindOne impl ${JSON.stringify(user)}`);
    return user;
  }
}
