import { Request, Response as Resp } from 'express';
import httpStatus from 'http-status';
import { GET, Path } from 'typescript-rest';
import { Response, Tags } from 'typescript-rest-swagger';
import { IBaseController } from '../../../shared/infrastructure/controllers/IBaseController';
import { ErrorHandler } from '../../../shared/domain/service/ErrorHandler';
import { IUserFindOne } from '../../application/use-case/interface/IUsersFindOne';
import { IUser } from '../../domain/entity/IUser';

@Path('/users')
export class FindOneUserController implements IBaseController {
  private readonly usecase: IUserFindOne;

  constructor(usecase: IUserFindOne) {
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
  @Tags('findOneUser')
  @Response<IUser>(200, 'OK')
  @Response<{ error: string }>(503, 'SERVICE UNAVAILABLE')
  protected async impl(id: string): Promise<IUser> {
    const user = await this.usecase.findOne(id);

    // Agregar validador si no se encuentra al usuario.
    log.info(`Controller de FindOne impl ${JSON.stringify(user)}`);
    return user;
  }
}
