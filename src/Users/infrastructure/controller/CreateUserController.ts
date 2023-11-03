import { Request, Response as Resp } from 'express';
import httpStatus from 'http-status';
import { Path, POST } from 'typescript-rest';
import { Response, Tags } from 'typescript-rest-swagger';
import { randomUUID } from 'crypto';
import { IBaseController } from '../../../shared/infrastructure/controllers/IBaseController';
import { ErrorHandler } from '../../../shared/domain/service/ErrorHandler';
import { IUserCreate } from '../../application/use-case/interface/IUserCreate';
import { IUser } from '../../domain/entity/IUser';

@Path('/users')
export class CreateUserController implements IBaseController {
  private readonly useCase: IUserCreate;

  constructor(useCase: IUserCreate) {
    this.useCase = useCase;
  }

  run = async (req: Request, res: Resp): Promise<void> => {
    const id = randomUUID();
    const { nombre, apellido, email, cv_bucket_url, linkedin_url, github_url } = req.body;

    // log.info(`valores de  nombre ${nombre}`);
    // ====== Creacion de Usuario con IUser ======
    const user: IUser = {
      id: Object.freeze(id),
      nombre,
      apellido,
      email,
      cv_bucket_url,
      linkedin_url,
      github_url,
      created_at: new Date(),
      updated_at: new Date(),
    };

    try {
      // log.info(` user : ${body.nombre}`);
      const response = await this.impl(user);
      // log.info(` user : ${response}`);
      res.status(httpStatus.OK).json(response);
    } catch (error) {
      ErrorHandler.catch(error as Record<any, any>, res);
    }
  };

  @POST
  @Tags('Users')
  @Response<string>(201, 'CREATED')
  @Response<{ error: string }>(503, 'SERVICE UNAVAILABLE')
  protected async impl(body: IUser): Promise<string> {
    return this.useCase.create(body);
  }
}
