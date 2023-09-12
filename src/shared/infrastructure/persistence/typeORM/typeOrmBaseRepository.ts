import {BaseEntity, DataSource , Repository } from  'typeorm'
import { Write } from '../../../domain/repository/Write';
import { Read } from '../../../domain/repository/Read';
import { type } from 'os';
import { User } from 'Users/infrastructure/persistence/Postgres/model/UserModel'; 



export class TyOrmBaseRepository implements Write{
  private _model: BaseEntity;
  // private _dataModel : DataSource;
  // protected _userRepository: any;
   

  constructor(schemaModel: BaseEntity) {
    this._model = schemaModel;
    // this._userRepository = this._dataModel.getRepository();
  }

  create< V>(body: any ): Promise<V> {
    return new Promise<V>(async (resolve, reject) => {
      
        if(body == undefined){
          log.error(`Database error is  ${body}`);
          reject(body);
         
        }else{
          log.info(`TyOrmBaseRepository  , body : ${body}`)
          this._model = body
          this._model.save()
          log.info(`Database response ${JSON.stringify(body)}`);
          resolve(body as unknown as V);
        }

      // log.info(` body : ${JSON.stringify(body)}`)
      // let save = await this._model.save(body);
      // log.info(`Database response ${JSON.stringify(save)}`);
      // resolve( save as unknown as V);

      // this._model.create(body, (err: CallbackError, res: Document) => {
      //   if (err) {
      //     log.error(`Database error ${err}`);
      //     reject(err);
      //   } else {
      //     log.info(`Database response ${JSON.stringify(res)}`);
      //     resolve(res as unknown as V);
      //   }
      // });
    });
  }
  
  find<V>(): Promise<V[]> {
    return new Promise<V[]>(async (resolve, reject)=>{
      
    })
  }

  // update<T, V>(
  //   query: FilterQuery<T>,
  //   update: UpdateQuery<T>,
  //   options?: QueryOptions,
  // ): Promise<V> {
  //   return new Promise<V>((resolve, reject) => {
  //     this._model.updateOne(
  //       query,
  //       update,
  //       options,
  //       (err: CallbackError, res: Document) => {
  //         if (err) {
  //           log.error(`Database error ${err}`);
  //           reject(err);
  //         } else {
  //           log.info(`Database response ${JSON.stringify(res)}`);
  //           resolve(res as unknown as V);
  //         }
  //       },
  //     );
  //   });
  // }

  // find<T, V>(
  //   filter: FilterQuery<T>,
  //   projection?: never | null,
  //   options?: QueryOptions,
  // ): Promise<Array<V>> {
  //   return new Promise<Array<V>>((resolve, reject) => {
  //     this._model.find(
  //       filter,
  //       projection,
  //       options,
  //       (err: CallbackError, res: Array<Document>) => {
  //         if (err) {
  //           log.error(`Database error ${err}`);
  //           reject(err);
  //         } else {
  //           log.info(`Database response ${JSON.stringify(res)}`);
  //           resolve((res as unknown) as Array<V>);
  //         }
  //       },
  //     );
  //   });
  // }
}
