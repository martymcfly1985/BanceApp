export interface IUser {
  recnum?: number;
  username: string;
  password: string;
  email: string;
  firstName: string;
  lastName: string;
  city: string;
  state: string;
  role: RoleEnum;
  leagues?: string;
  verified: boolean;
  public: boolean;
  skillLevel?: number;
}

export enum RoleEnum {
  User,
  Moderator,
  Admin
}

export interface VerificationInformation {
  email: string;
  verificationCode: number
}