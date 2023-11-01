

export interface Read {
  find<T, V>(): Promise<V | Array<V>>;
  
  findOne<T,V>(id: T): Promise<V | undefined>
}

