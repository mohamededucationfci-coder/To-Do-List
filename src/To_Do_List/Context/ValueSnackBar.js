import { createContext, useState } from "react";

export const ValueSnackBar = createContext([]);
export const SetValueSnackBar = createContext();
export default function ValueSnackBarProvider({ children }) {
  const [open, setOpen] = useState(false);

  return (
    <ValueSnackBar.Provider value={open}>
      <SetValueSnackBar.Provider value={setOpen}>
        {children}
      </SetValueSnackBar.Provider>
    </ValueSnackBar.Provider>
  );
}
