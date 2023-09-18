import {BaseEntity, ObjectLiteral } from  'typeorm'
import { Write } from '../../../domain/repository/Write';
import { Postgres } from '../../config/postgres/Postgres';
import {Read} from '../../../domain/repository/Read'
import {CreateDTO} from '../../../domain/entity/dto/CreateDTO'
import {UpdateDTO} from '../../../domain/entity/dto/UpdateDTO'
import { UseCaseBaseResponse } from '../../../domain/repository/UseCaseBaseResponse';



export class TyOrmBaseRepository implements Write , Read{
  private _model:any;
  private _createDto : CreateDTO ;
private _updateDTO : UpdateDTO;



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
              // log.info(`Database response ${JSON.stringify(body)}`);
              this._createDto = { messages : "user successfully created"};

              resolve(this._createDto.messages as V);
          }
          else
          {
            log.error(`Database error is  ${this._model}`);
            reject(body);
          }
        
        }
    });
  }

  update<T , S , V>(body: T , id : S ): Promise<V> {
    return new Promise<V>(async (resolve, reject) => {
      if(body == undefined ){

        log.error(`Database error is resquest invalid ${body}`);
        reject(body);

      }
      else{
          if(typeof this._model == typeof BaseEntity && id != undefined ){

                const userExist = await Postgres.db.getRepository(this._model).findOne({
                  where: {
                    id: id
                  }
                }); 

                // log.info(` usuario existe ${userExist}`);

            if (userExist != null ){
                await  Postgres
                .db
                .getRepository(this._model)
                .update(id , body);
                this._updateDTO = {
                  updateUserId: id,
                  dateModified : new Date()
                }

                resolve( this._updateDTO as V);
            }
            else{
              log.error(`id does not exist ${id}`);
              reject(body)
            }
          }
          else {
            log.error(` error in model   ${this._model}`);
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
            log.info(`Database response : Find users`);
            // resolve((users as unknown) as Array<V>);
            // log.error(`Database error ${err}`);
            // reject(err);
          } else {
            log.error(`error in model    ${this._model}`);
            reject();
          }
    });
  }


}

