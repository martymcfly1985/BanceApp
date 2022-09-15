import { ILocation } from "../Models/Location";

export const fetchLocationData = async() => {
  const response = await fetch('api/getLocationData');
  const data: ILocation[] = await response.json();

  return data;
}