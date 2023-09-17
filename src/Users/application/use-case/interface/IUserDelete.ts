
export interface IUserDelete {
  delete(id: string): Promise<string>;
}