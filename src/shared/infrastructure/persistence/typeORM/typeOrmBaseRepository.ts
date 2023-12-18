import { BaseEntity, ObjectLiteral } from 'typeorm';
import { emitWarning } from 'process';
import { Write } from '../../../domain/repository/Write';
import { Postgres } from '../../config/postgres/Postgres';
import { Read } from '../../../domain/repository/Read';
import { CreateDTO } from '../../../domain/entity/dto/CreateDTO';
import { UpdateDTO } from '../../../domain/entity/dto/UpdateDTO';
import { UseCaseBaseResponse } from '../../../domain/repository/UseCaseBaseResponse';

export class TyOrmBaseRepository implements Write, Read {
  private _model: any;
  private _createDto: CreateDTO;
  private _updateDTO: UpdateDTO;

  // se hace una injeccion de dependencias para poder utilizar el modelo
  constructor(model: any) {
    this._model = model;
  }

  create<T, V>(body: T): Promise<V> {
    return new Promise<V>((resolve, reject) => {
      if (body === undefined) {
        //log.error(`Database error is  ${body}`);
        reject(body);
      }
      // verificamos que el dato se que envio sea del que implemente las entidades
      // ../../../../Users/infrastructure/persistence/Postgres/model/UserModel'; --> modelo entidad
      if (typeof this._model === typeof BaseEntity) {
        Postgres.db.getRepository(this._model).save(body as any).then();
        // log.info(`Database response ${JSON.stringify(body)}`);
        this._createDto = { messages: 'record created successfully' };

        resolve(this._createDto.messages as unknown as V);
      } else {
        // log.error(`Database error is  ${this._model}`);
        reject(body);
      }
    });
  }

  update<T, S, V>(body: T, id: S): Promise<V> {
    return new Promise<V>((resolve, reject) => {
      if (body === undefined) {
        log.error(`Database error is resquest invalid ${body}`);
        reject(body);
      } else if (typeof this._model === typeof BaseEntity && id !== undefined) {
        const userExist = Postgres.db.getRepository(this._model).findOne({ where: { id } }).then((data) => data);

        // log.info(` usuario existe ${userExist}`);

        if (userExist !== null) {
          Postgres.db.getRepository(this._model).update(id || {}, body || {}).then();
          this._updateDTO = {
            updateUserId: id,
            dateModified: new Date(),
          };

          resolve(this._updateDTO as unknown as V);
        } else {
          log.error(`id does not exist ${id}`);
          reject(body);
        }
      } else {
        log.error(` error in model   ${this._model}`);
        reject(body);
      }
    });
  }

  find<T, V>(): Promise<Array<V>> {
    return new Promise<Array<V>>((resolve, reject) => {
      if (typeof this._model === typeof BaseEntity) {
        const users: Promise<Array<ObjectLiteral>> = Postgres.db
          .getRepository(this._model)
          .find().then((data) => data);
        users.then((user) => resolve(user as Array<V>));
        log.info('Database response: Find users');
        // resolve((users as unknown) as Array<V>);
        // log.error(`Database error ${err}`);
        // reject(err);
      } else {
        log.error(`error in model ${this._model}`);
        reject();
      }
    });
  }

  findOne<T, V>(id: T): Promise<V | undefined> {
    return new Promise<V | undefined>((resolve, reject) => {
      if (typeof this._model === typeof BaseEntity) {
        const user: ObjectLiteral | null = Postgres.db
          .getRepository(this._model)
          .findOne({ where: { id } }).then((data) => data);
        log.info(`variable de user with ${user}`);

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
    });
  }

  delete<T, V>(id: T): Promise<V | string> {
    return new Promise<V | string>((resolve, reject) => {
      if (typeof this._model === typeof BaseEntity) {
        try {
          const result: any = Postgres.db.getRepository(this._model).delete({ id }).then((data) => data);

          if (result?.affected === 0) {
            log.info('No se encontró ningún registro con el ID especificado.');
          } else {
            const deleted = `Registro con ID ${id} eliminado el ${new Date().toISOString()}`;
            resolve(deleted as string);
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
