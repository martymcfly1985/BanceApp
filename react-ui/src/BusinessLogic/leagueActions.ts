import { get, post } from "../CommonFunctions/HttpMethods"
import { ILeague } from "../Models/League";
import { ILeagueMember } from "../Models/LeagueMember";
import { IUserLeagueData } from "../Models/UserLeagueData"

export const fetchUserLeagueData = async(userRecnum: number) => {
  return await get<IUserLeagueData[]>(`api/getUserLeagueData/${userRecnum}`);
}

export const fetchMembersList = async(leagueRecnum: number) => {
  return await get<ILeagueMember[]>(`api/getLeagueMembers/${leagueRecnum}`);
}

export const updateLeague = async(newLeagueValues: ILeague) => {
  await post('api/updateLeague', newLeagueValues); 
}