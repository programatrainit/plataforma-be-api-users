import {BaseEntity, ObjectLiteral } from  'typeorm'
import { Write } from '../../../domain/repository/Write';
import { Postgres } from '../../config/postgres/Postgres';
import {Read} from '../../../domain/repository/Read';
import { DeleteDTO } from '../../../domain/entity/dto/DeleteDTO';



export class TyOrmBaseRepository implements Write , Read{
  private _model:any;
  private _deleteDTO: DeleteDTO;


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

  findOne<T, V>(id: T): Promise<V | undefined> {
    return new Promise<V | undefined>(async(resolve, reject) => {
  
      if(typeof this._model === typeof BaseEntity){

        const user: ObjectLiteral | null = await
        Postgres
        .db
        .getRepository(this._model)
        .findOne({
          where: {
            id: id
          }
        });
        log.info(`variable de user with ${user}`)
        
        if (user !== null) {
          log.info(`Database response with ${JSON.stringify(user)}`);
          resolve(user as V);
        } else {
          resolve(undefined);
        }
        
      } else {
        log.error(`Database error ${this._model}`);
        reject();
      }
    })
  }


  delete<T, V>(id: T): Promise<V | string> {
    return new Promise<V | string>(async (resolve, reject) => {
      if (typeof this._model === typeof BaseEntity) {
        try {
          const result = await 
          Postgres
          .db
          .getRepository(this._model)
          .delete({
            id: id
          });

          if (result.affected === 0) {
            log.info("No se encontró ningún registro con el ID especificado.");
          } else {
            this._deleteDTO = {message: `Registro con ID ${id} eliminado correctamente el `+ new Date().toISOString()}
            // const deleted = `Registro con ID ${id} eliminado el `+ new Date().toISOString();
            resolve(this._deleteDTO.message as string);
            
          }
  
        } catch (error) {
          reject(error);
        }
      } else {
        log.error(`Database error ${this._model}`);
        reject(id);
      }
    });
  }
  


}



