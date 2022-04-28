import { ICourt } from "../Models/Court";

export const fetchCourtData = async() => {
  const response = await fetch('api/getCourtData');
  const data: ICourt[] = await response.json();

  return data;
}