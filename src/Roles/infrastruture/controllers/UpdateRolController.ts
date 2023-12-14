import { Request, RequestHandler, Response as Res } from 'express';
import { POST } from 'typescript-rest';
import { Tags, Response } from 'typescript-rest-swagger';
import httpStatus from 'http-status';
import { IBaseController } from '../../../shared/infrastructure/controllers/IBaseController';
import { ErrorHandler } from '../../../shared/domain/service/ErrorHandler';
import { UpdateRolUseCase } from '../../application/use-case/updateRolUseCase';
import { DataToUpdate } from '../../application/use-case/interface/IURolUpdate';

export class UpdateRolController implements IBaseController {
  private readonly useCase:UpdateRolUseCase;
  constructor(useCase:UpdateRolUseCase) {
    this.useCase = useCase;
  }

  run = async (req: Request, res: Res) => {
    const { id } = req.query;
    const { newName, newDescription } = req.body;
    const dataToUpdate = {
      id: String(id),
      body: { newName, newDescription },
    };
    const statusCode400 = Number(httpStatus[400]);
    res.status(statusCode400); //! i need throw an error
    try {
      await this.impl({ dataToUpdate });
    } catch (error) {
      ErrorHandler.catch(error as Record<any, any>, res);
    }
  };

  @POST
  @Tags('Rol')
  @Response<string>(201, 'UPDATE')
  @Response<{ error: string }>(503, 'SERVICE UNAVAILABLE')
  protected async impl({ dataToUpdate }: { dataToUpdate: DataToUpdate; }): Promise<object> {
    return this.useCase.update(dataToUpdate);
  }
}
