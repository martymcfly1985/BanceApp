import { get } from "../CommonFunctions/HttpMethods"
import { ILeague } from "../Models/League"

export const fetchUserLeagueData = async(userRecnum: number) => {
  return get<ILeague[]>(`api/getUserLeagueData/${userRecnum}`)
}