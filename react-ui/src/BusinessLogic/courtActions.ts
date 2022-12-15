import { ICourt } from "../Models/Court";
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

export const saveNewCourt = async(newCourt: ICourt) => {
  let response = await fetch('api/submitNewCourt', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(newCourt)
  });
  if (!response.ok) {
    const error = new Error;
    error.message = response.statusText
    throw error;
  }
}

export const saveNewRating = async(newRating: number, courtRecnum: number) => {
  let response = await fetch('api/submitNewRating', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({newRating, courtRecnum})
  });
  if (!response.ok) {
    const error = new Error;
    error.message = response.statusText
    throw error;
  }
}