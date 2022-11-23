import { ICourt } from "../Models/Court";

export const courtNameIsUnique = (newCourtName: string, courtList: ICourt[]) => {
  const duplicateCourtName = courtList.find((court) => {
    return newCourtName.toUpperCase() === court.name.toUpperCase(); 
  });
  return duplicateCourtName === undefined;
}