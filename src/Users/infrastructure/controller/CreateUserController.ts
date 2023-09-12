import { Request, Response as Resp  } from 'express';
import httpStatus from 'http-status';
import { Path, POST } from 'typescript-rest';
import { Response, Tags } from 'typescript-rest-swagger';
import { IBaseController } from '../../../shared/infrastructure/controllers/IBaseController';
import { ErrorHandler } from '../../../shared/domain/service/ErrorHandler';
import {IUserCreate } from '../../application/use-case/interface/IUserCreate';
import { User } from '../persistence/Postgres/model/UserModel'
import { type } from 'os';

@Path('/user')
export class CreateUserController implements IBaseController {
  private readonly useCase: IUserCreate;
  // // private  users : User;

  constructor(useCase: IUserCreate) {
    this.useCase = useCase;
  }

  run = async (req: Request, res: Resp): Promise<void> => {
    const {nombre, apellido , email ,cv_bucket_url,likedin_url ,github_url }  = req.body;
    let body = new User();
    body.nombre = nombre;
    body.apellido = apellido;
    body.email = email;
    body.cv_bucket_url = cv_bucket_url;
    body.likedin_url = likedin_url;
    body.github_url =  github_url;
    try {
      log.info(` user : ${body.nombre}`);
      const response = await this.impl(body);
      log.info(` user : ${response}`);
      res.status(httpStatus.OK).json(response);
    } catch (error) {
      ErrorHandler.catch(error as Record<any, any>, res);
    }
  };

  @POST
  @Tags('Users')
  @Response<{id: number}>(200, 'OK')
  @Response<{ error: string; }>(503, 'SERVICE UNAVAILABLE')
  protected async impl(body: User): Promise<{id : number}> { 

    return this.useCase.create(body);
  }
}

