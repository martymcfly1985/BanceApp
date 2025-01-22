import { get, post } from "../CommonFunctions/HttpMethods";
import { IUser } from "../Models/User";

export const saveNewUser = async(newUser: IUser) => {
  post<any>('api/saveNewUser', newUser);
}

export const signIn = async(values: any) => {
  return post<any>('api/signIn', values);
}

export const searchUsersNotInLeague = async(searchString: string, leagueRecnum: number) => {
  return get<IUser[]>(`api/searchUsersNotInLeague/${searchString}/${leagueRecnum}`);
}