import { Request, Response as Resp } from 'express';
import httpStatus from 'http-status';
import { Path, PUT } from 'typescript-rest';
import { Response, Tags } from 'typescript-rest-swagger';
import { IBaseController } from '../../../shared/infrastructure/controllers/IBaseController';
import { ErrorHandler } from '../../../shared/domain/service/ErrorHandler';
import { IUserUpdate } from '../../application/use-case/interface/IUserUpdate';
import { IUser } from '../../domain/entity/IUser';

@Path('/users')
export class UpdateUserConstroller implements IBaseController {
  private readonly _useCase: IUserUpdate;

  constructor(useCase: IUserUpdate) {
    this._useCase = useCase;
  }

  @PUT
  @Tags('Users')
  @Response<any>(200, 'OK')
  @Response<{ error: string }>(503, 'SERVICE UNAVAILABLE')
    run = async (req: Request, res: Resp): Promise<void> => {
      const {
        id,
        nombre,
        apellido,
        email,
        cv_bucket_url,
        linkedin_url,
        github_url,
        created_at,
      } = req.body;
      const userUpdate: IUser = {
        id,
        nombre,
        apellido,
        email,
        cv_bucket_url,
        linkedin_url,
        github_url,
        created_at,
        updated_at: new Date(),
      };
      const ID: string = userUpdate.id;
      try {
        // log.info(` user : ${body.nombre}`);
        const response = await this.impl(userUpdate, ID);
        // log.info(` user : ${response}`);
        res.status(httpStatus.OK).json(response);
      } catch (error) {
        ErrorHandler.catch(error as Record<any, any>, res);
      }
    };

  protected async impl(body: IUser, id: string): Promise<object> {
    return this._useCase.Update(body, id);
  }
}
