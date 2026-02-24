import { createContext } from "react";

export let Context = createContext();

 export default function ContextProvider(props){
    return <Context.Provider value={props.value}> 
               {props.children}
           </Context.Provider>
}

