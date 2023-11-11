import { Request, Response as Res } from 'express';
import { DELETE } from 'typescript-rest';
import { Tags, Response } from 'typescript-rest-swagger';
import httpStatus from 'http-status';
import { IBaseController } from '../../../shared/infrastructure/controllers/IBaseController';
import { ErrorHandler } from '../../../shared/domain/service/ErrorHandler';
import { DeleteRolUseCase } from '../../application/use-case/deleteRolUseCases';

export class DeleteRolController implements IBaseController {
  private readonly useCase:DeleteRolUseCase;
  constructor(useCase:DeleteRolUseCase) {
    this.useCase = useCase;
  }

  run = async (req:Request, res:Res):Promise<void> => {
    const { id } = req.body;
    try {
      const reponse = await this.impl(id);
      res.status(httpStatus.OK).json(reponse);
    } catch (error) {
      ErrorHandler.catch(error as Record<any, any>, res);
    }
  };

  @DELETE
  @Tags('Rol')
  @Response<string>(201, 'CREATED')
  @Response<{ error: string }>(503, 'SERVICE UNAVAILABLE')
  protected async impl(id: string): Promise<string> {
    return this.useCase.delete(id);
  }
}
