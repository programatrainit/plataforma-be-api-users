import { Request, Response as Resp } from 'express';
import httpStatus from 'http-status';
import { DELETE, Path } from 'typescript-rest';
import { Response, Tags } from 'typescript-rest-swagger';
import { IBaseController } from '../../../shared/infrastructure/controllers/IBaseController';
import { ErrorHandler } from '../../../shared/domain/service/ErrorHandler';
import { IUserDelete } from '../../application/use-case/interface/IUserDelete';

@Path('/users')
export class DeleteUserController implements IBaseController {
  private readonly usecase: IUserDelete;

  constructor(usecase: IUserDelete) {
    this.usecase = usecase;
  }

  run = async (req: Request, res: Resp): Promise<void> => {
    const { id } = req.params;

    try {
      const response = await this.impl(id);
      res.status(httpStatus.OK).json(response);
    } catch (error) {
      ErrorHandler.catch(error as Record<any, any>, res);
    }
  };

  @DELETE
  @Path('/:id')
  @Tags('deleteUser')
  @Response<{ succes: string }>(200, 'OK')
  @Response<{ error: string }>(503, 'SERVICE UNAVAILABLE')
  protected async impl(id: string): Promise<string> {
    const user = await this.usecase.delete(id);
    return user;
  }
}
