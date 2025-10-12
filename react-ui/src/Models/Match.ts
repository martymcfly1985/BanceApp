export interface IMatch {
  recnum: number;
  leagueRecnum: number;
  courtRecnum: number;
  datetime: Date;
  players: IMatchPlayer[];
}

export interface IMatchPlayer {
  userRecnum: number;
  team: number;
}