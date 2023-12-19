export interface IModuleDelete {
  Delete(id: string): Promise<string>;
}
