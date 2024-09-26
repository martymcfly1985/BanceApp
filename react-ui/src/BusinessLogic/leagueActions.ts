import { get } from "../CommonFunctions/HttpMethods"
import { IUserLeagueData } from "../Models/UserLeagueData"

export const fetchUserLeagueData = async(userRecnum: number) => {
  return await get<IUserLeagueData[]>(`api/getUserLeagueData/${userRecnum}`);
}