import {IUser} from '../../../domain/entity/IUser'

export interface IUserUpdate {
    Update(body: IUser , id :string) : Promise<object>
}