import { ILocation } from "../Models/Location";

export const fetchLocationData = async() => {
  const response = await fetch('api/getLocationData');
  if (!response.ok) {
    const error = new Error;
    error.message = response.statusText
    throw error;
  }
  const data: ILocation[] = await response.json();

  return data;
}