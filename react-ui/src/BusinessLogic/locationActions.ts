import { ILocation } from "../Models/Location";

export const saveNewLocation = async(newLocation: ILocation) => {
  let response = await fetch('api/submitNewLocation', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(newLocation)
  });
  if (!response.ok) {
    const error = new Error;
    error.message = response.statusText
    throw error;
  }
  const data: boolean = await response.json();
  console.log(data);
  return data;
}