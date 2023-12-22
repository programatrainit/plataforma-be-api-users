import { Request, Response as Resp } from 'express';
import httpStatus from 'http-status';
import { Path, POST } from 'typescript-rest';
import { Response, Tags } from 'typescript-rest-swagger';
import { randomUUID } from 'crypto';
import { IBaseController } from '../../../shared/infrastructure/controllers/IBaseController';
import { ErrorHandler } from '../../../shared/domain/service/ErrorHandler';
import { IModuleCreate } from '../../application/use-case/interface/IModuleCreate';
import { IModule } from '../../domain/entity/IModule';

@Path('/modules') // Ruta para crear modulos
export class CreateModuleController implements IBaseController {
  private readonly useCase: IModuleCreate;

  constructor(useCase: IModuleCreate) {
    this.useCase = useCase;
  }

  run = async (req: Request, res: Resp): Promise<void> => {
    const id = randomUUID();
    const { name, description, moduleStartDate } = req.body;
    const parseStartDate = new Date(moduleStartDate);

    // ====== Creacion de Module siguiendo la interfaz IModule ======
    const module: IModule = {
      id: Object.freeze(id),
      name,
      status: true,
      moduleStartDate: parseStartDate,
      description,
      created_at: new Date(),
      updated_at: new Date(),
    };

    try {
      const response = await this.impl(module);
      res.status(httpStatus.OK).json(response);
    } catch (error) {
      ErrorHandler.catch(error as Record<any, any>, res);
    }
  };

  @POST
  @Tags('Modules')
  @Response<string>(201, 'CREATED')
  @Response<{ error: string }>(503, 'SERVICE UNAVAILABLE')
  protected async impl(body: IModule): Promise<string> {
    return this.useCase.create(body);
  }
}
