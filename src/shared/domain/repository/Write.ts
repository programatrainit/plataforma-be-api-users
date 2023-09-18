import { FilterQuery, QueryOptions, UpdateQuery } from 'mongoose';
import{BaseEntity} from 'typeorm';

export interface Write {
  create<T , V>(body: T ): Promise<V>;
  update<T, S, V>(body: T , id :S): Promise<V>;
}
