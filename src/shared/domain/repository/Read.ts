

export interface Read {
  find<T, V>(): Promise<V | Array<V>>;
  // findById<>
}
