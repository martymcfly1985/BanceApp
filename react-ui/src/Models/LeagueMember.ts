export interface ILeagueMember {
  recnum: number;
  leagueRecnum: number;
  userRecnum: number;
  role: LeagueRoleEnum;
  sub: boolean;
  firstName: string;
  lastName: string;
  email: string;
}

export enum LeagueRoleEnum {
  Owner = 'Owner',
  Moderator = 'Moderator',
  Member = 'Member'
}