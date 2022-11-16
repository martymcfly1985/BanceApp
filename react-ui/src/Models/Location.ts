import { ICourt } from "./Court";

export interface ILocation {
    recnum?: number;
    address: string;
    hours: string;
    courts: ICourt[];
    name: string;
  }