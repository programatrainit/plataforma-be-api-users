import {IUser} from '../../domain/entity/IUser'
import { IUserUpdate } from './interface/IUserUpdate';
import { UserWriteRepository } from '../../domain/repository/UserWriteRepository';

export class UpdateUserUseCase implements IUserUpdate{
    private _repo : UserWriteRepository
    constructor( repo : UserWriteRepository ){
        this._repo = repo;
    }

    Update(body: IUser , id :string ): Promise<object> {
        
        const response = this._repo.updateUser(body , id);

        return response;
    }
}