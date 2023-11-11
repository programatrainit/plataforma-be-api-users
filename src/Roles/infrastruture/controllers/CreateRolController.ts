import { randomUUID } from 'crypto';
import { Request, Response as Res } from 'express';
import { POST } from 'typescript-rest';
import { Tags, Response } from 'typescript-rest-swagger';
import httpStatus from 'http-status';
import { ErrorHandler } from '../../../shared/domain/service/ErrorHandler';
import { IBaseController } from '../../../shared/infrastructure/controllers/IBaseController';
import { IUrol } from '../../domain/entity/IRol';
import { CreateRolUseCase } from '../../application/use-case/createRolUsecase';

export class CreateRolController implements IBaseController {
  private readonly useCase:CreateRolUseCase;
  constructor(useCase:CreateRolUseCase) {
    this.useCase = useCase;
  }

  run = async (req: Request, res: Res,next:any): Promise<void> => {
    const id = randomUUID();
    const { name, description } = req.body;
    const rol:IUrol = {
      id: Object.freeze(id),
      name,
      description,
      created_at: new Date(),
      updated_at: new Date(),
    };
    console.log(rol, '<<<----------------------------'); 
    console.log('Entre bien');

    try {
      const response = await this.impl(rol);
      res.status(httpStatus.OK).json(response);
    } catch (error) {
      ErrorHandler.catch(error as Record<any, any>, res);
      next(error);
    }
  };

  @POST
  @Tags('Users')
  @Response<string>(201, 'CREATED')
  @Response<{ error: string }>(503, 'SERVICE UNAVAILABLE')
  protected async impl(body: IUrol): Promise<string> {
    return this.useCase.create(body);
  }
}

export default CreateRolController;
