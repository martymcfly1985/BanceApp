import { post } from "../CommonFunctions/HttpMethods";
import { IUser } from "../Models/User";

export const saveNewUser = async(newUser: IUser) => {
  post<any>('api/saveNewUser', newUser);
}