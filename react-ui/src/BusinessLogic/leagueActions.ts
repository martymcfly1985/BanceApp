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

export const saveLeagueMember = async(leagueRecnum: number, userRecnum: number, leagueRole: string, sub: boolean) => {
  return await post<ILeagueMember>('api/saveLeagueMember', {leagueRecnum, userRecnum, leagueRole, sub})
}

export const deleteLeagueMember = async(leagueRecnum: number, userRecnum: number) => {
  return await post<ILeagueMember>('api/deleteLeagueMember', {leagueRecnum, userRecnum})
}