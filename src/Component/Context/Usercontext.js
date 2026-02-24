import { createContext, useState } from "react";

export let userContext = createContext();
export default function UserContextProvider(props){

    const[userToken , setUsertoken] = useState(  localStorage.getItem("userToken"));
    let [userData , setUserData] = useState({});
    return <userContext.Provider value={{userToken , setUsertoken , userData , setUserData}}>
               {props.children}
           </userContext.Provider>
};