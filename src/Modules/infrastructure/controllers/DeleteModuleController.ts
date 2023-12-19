import { Request, Response as Resp } from 'express';
import httpStatus from 'http-status';
import { DELETE, Path } from 'typescript-rest';
import { Response, Tags } from 'typescript-rest-swagger';
import { IBaseController } from '../../../shared/infrastructure/controllers/IBaseController';
import { ErrorHandler } from '../../../shared/domain/service/ErrorHandler';
import { IModuleDelete } from '../../application/use-case/interface/IModulleDelete';

@Path('/modules') // Ruta para crear modulos
export class DeleteModuleController implements IBaseController {
  private readonly useCase: IModuleDelete;

  constructor(useCase: IModuleDelete) {
    this.useCase = useCase;
  }

  run = async (req: Request, res: Resp): Promise<void> => {
    const { id } = req.params;
    console.log(id, '<<<<<--------------------------------------------------------------------');

    try {
      const response = await this.impl(id as string);
      res.status(httpStatus.OK).json(response);
    } catch (error) {
      ErrorHandler.catch(error as Record<any, any>, res);
    }
  };

  @DELETE
  @Tags('Modules')
  @Path('')
  @Response<string>(201, 'Deleted')
  @Response<{ error: string }>(503, 'SERVICE UNAVAILABLE')
  protected async impl(id: string): Promise<string> {
    console.log('entreee');
    return this.useCase.Delete(id);
  }
}
