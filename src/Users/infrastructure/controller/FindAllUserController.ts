import { Request, Response as Resp } from 'express';
import httpStatus from 'http-status';
import { GET, Path, POST } from 'typescript-rest';
import { Response, Tags } from 'typescript-rest-swagger';
import { IBaseController } from '../../../shared/infrastructure/controllers/IBaseController';
import { ErrorHandler } from '../../../shared/domain/service/ErrorHandler';
import { IUserFindAll } from '../../application/use-case/interface/IUsersFindAll';
import { IUser } from '../../domain/entity/IUser'

@Path('/users')
export class FindAllUserController implements IBaseController  {
  private readonly useCase: IUserFindAll;

  constructor(useCase: IUserFindAll) {
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
  @Tags('users')
  @Response<Array<IUser>>(200, 'OK')
  @Response<{ error: string; }>(503, 'SERVICE UNAVAILABLE')
  protected async impl(): Promise<Array<IUser>> {
    return this.useCase.findAll();
  }
}
