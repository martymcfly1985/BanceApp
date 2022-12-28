import { post } from "../CommonFunctions/HttpMethods";
import { ILocation } from "../Models/Location";

export const saveNewLocation = async(newLocation: ILocation) => {
  return post<boolean>('api/submitNewLocation', newLocation);
}