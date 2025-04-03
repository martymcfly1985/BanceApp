import { ILeague } from "./League";
import { ILeagueMember } from "./LeagueMember";

export interface IUserLeagueData {
  league: ILeague;
  leagueMember: ILeagueMember;
}