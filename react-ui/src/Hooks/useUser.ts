import { useEffect, useState } from "react";
import { get, post } from "../CommonFunctions/HttpMethods";
import { IUser } from "../Models/User";

export function useUser() {
  const [userInfo, setUserInfo] = useState<IUser | null>(null);
  useEffect(() => {
    async function getUser() {
        if(localStorage.getItem('sessionRecnum') !== null) {
          const userInformation = await get<IUser | null>(`api/getUser/${localStorage.getItem('sessionRecnum')}`)
          setUserInfo(userInformation)
        }
    }
  
    getUser()
  }, [])
  return userInfo;
}