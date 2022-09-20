export interface ICourt {
  recnum: number;
  locationRecnum: number;
  surface: string;
  condition: number | null;
  lights: boolean;
  name: string;
}