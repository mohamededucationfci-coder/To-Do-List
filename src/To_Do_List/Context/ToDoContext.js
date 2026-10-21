import { createContext, useReducer, useEffect } from "react";
import reduceToDoList from "../Reducer/reduceToDoList";
export const ValueTasks = createContext([]);
export const Dispatch = createContext();
export default function ListOfToDoProvider({ children }) {
  const dataStorage = JSON.parse(window.localStorage.getItem("Tasks")) || [];

  const [value, dispatch] = useReducer(reduceToDoList, dataStorage);

  useEffect(() => {
    window.localStorage.setItem("Tasks", JSON.stringify(value));
  }, [value]);
  return (
    <ValueTasks.Provider value={value}>
      <Dispatch.Provider value={dispatch}>{children}</Dispatch.Provider>
    </ValueTasks.Provider>
  );
}
