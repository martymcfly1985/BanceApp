import { get, post } from "../CommonFunctions/HttpMethods";
import { ICourt } from "../Models/Court";
import { ILocation } from "../Models/Location";

export const fetchLocationData = async() => {
  return get<ILocation[]>('api/getLocationData');
}

export const saveNewCourt = async(newCourt: ICourt) => {
  post<any>('api/submitNewCourt', newCourt);
}

export const saveNewRating = async(rating: number, courtRecnum: number) => {
  return post<number>('api/submitNewRating', {rating, courtRecnum})
}