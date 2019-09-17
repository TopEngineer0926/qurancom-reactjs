import {useState} from "react";

export function useLocalState(localItem){
const [state, setState]=useState(localStorage.getItem(localItem));

function setLoc(newItem){
    localStorage.setItem(localItem,newItem);
    setState(newItem)
}
return [state,setLoc];
}