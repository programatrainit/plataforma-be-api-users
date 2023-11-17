import { Request, Response as Resp } from 'express';
import httpStatus from 'http-status';
import { Path, PUT } from 'typescript-rest';
import { Response, Tags } from 'typescript-rest-swagger';
import { IBaseController } from '../../../shared/infrastructure/controllers/IBaseController';
import { ErrorHandler } from '../../../shared/domain/service/ErrorHandler';
import { IModuleUpdate } from '../../application/use-case/interface/IModuleUpdate';
import { IModule } from '../../domain/entity/IModule';

@Path('/module')
export class UpdateModuleConstroller implements IBaseController {
  private readonly _useCase: IModuleUpdate;

  constructor(useCase: IModuleUpdate) {
    this._useCase = useCase;
  }

  @PUT
  @Tags('Modules')
  @Response<any>(200, 'OK')
  @Response<{ error: string }>(503, 'SERVICE UNAVAILABLE')
    run = async (req: Request, res: Resp): Promise<void> => {
      const { id, name, description, created_at } = req.body;
      const userUpdate: IModule = {
        id,
        name,
        description,
        created_at,
        updated_at: new Date(),
      };
      const ID: string = userUpdate.id;
      try {
        const response = await this.impl(userUpdate, ID);
        res.status(httpStatus.OK).json(response);
      } catch (error) {
        ErrorHandler.catch(error as Record<any, any>, res);
      }
    };

  protected async impl(body: IModule, id: string): Promise<object> {
    return this._useCase.Update(body, id);
  }
}
