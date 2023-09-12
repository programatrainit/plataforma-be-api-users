import { IUser } from '../../../domain/entity/IUser';

export interface IMetricFindAll {
  findAll(): Promise<Array<IUser>>;
}
