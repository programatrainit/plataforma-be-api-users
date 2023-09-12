import {BaseEntity, ObjectLiteral } from  'typeorm'
import { Write } from '../../../domain/repository/Write';
import { Postgres } from '../../config/postgres/Postgres';
import {Read} from '../../../domain/repository/Read'



export class TyOrmBaseRepository implements Write , Read{
  private _model:any;


// se hace una injeccion de dependencias para poder utilizar el modelo 
  constructor( model: any) {
      this._model= model
  }

   create<T, V>(body: T ): Promise<V> {
    return new Promise<V>(async (resolve, reject) => {
        if(body == undefined){
          log.error(`Database error is  ${body}`);
          reject(body);
         
        }else{
          // verificamos que el dato se que envio sea del que implemente las entidades 
          //../../../../Users/infrastructure/persistence/Postgres/model/UserModel'; --> modelo entidad 
          if(typeof this._model == typeof BaseEntity){
              Postgres
              .db
              .getRepository(this._model)
              .save(body);
              log.info(`Database response ${JSON.stringify(body)}`);
              resolve(body  as V);
          }
          else
          {
            log.error(`Database error is  ${this._model}`);
            reject(body);
          }
        
        }
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

  find<T, V>(): Promise<Array<V>> {
    return new Promise<Array<V>>((resolve, reject) => {

          if (typeof this._model == typeof BaseEntity) {
            const users :  Promise<Array<ObjectLiteral>> =
            Postgres
            .db
            .getRepository(this._model)
            .find();
            users.then( users => resolve(users as Array<V>))
            log.info(`Database response ${users}`);
            // resolve((users as unknown) as Array<V>);
            // log.error(`Database error ${err}`);
            // reject(err);
          } else {
            log.error(`Database error ${this._model}`);
            reject();
          }
        },);
    }
  }

