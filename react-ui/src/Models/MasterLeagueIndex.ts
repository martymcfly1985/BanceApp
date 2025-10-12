import { ILeague } from "./League";
import { ILeagueMember } from "./LeagueMember";
import { ILocation } from "./Location";

export interface IMasterLeagueIndex extends ILeague {
  members: ILeagueMember[];
  locations: ILocation[];
}