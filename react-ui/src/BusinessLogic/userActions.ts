import { get, post } from "../CommonFunctions/HttpMethods";
import { IUser } from "../Models/User";

export const saveNewUser = async(newUser: IUser) => {
  post<any>('api/saveNewUser', newUser);
}

export const signIn = async(values: any) => {
  return post<any>('api/signIn', values);
}

export const searchUsers = async(value: string) => {
  return get<IUser[]>(`api/searchUsers/${value}`);
}