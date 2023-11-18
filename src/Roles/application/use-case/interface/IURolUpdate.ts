export interface Body {
    newName:string
    newDescription:string
}
export interface DataToUpdate {
  id:string
  body:Body
 }
export interface IUrolUpdate {
  update (dataToUpdate:DataToUpdate):Promise<object>
}
