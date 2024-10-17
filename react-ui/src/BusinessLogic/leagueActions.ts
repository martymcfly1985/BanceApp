import { get, post } from "../CommonFunctions/HttpMethods"
import { ILeague } from "../Models/League";
import { IUserLeagueData } from "../Models/UserLeagueData"

export const fetchUserLeagueData = async(userRecnum: number) => {
  return await get<IUserLeagueData[]>(`api/getUserLeagueData/${userRecnum}`);
}

export const updateLeague = async(newLeagueValues: ILeague) => {
  await post('api/updateLeague', newLeagueValues); 
}