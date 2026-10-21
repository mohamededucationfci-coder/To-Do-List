import { createContext, useState } from "react";

export const ContentSnackBar = createContext([]);
export const SetContentSnackBar = createContext();

export default function SnackbarProvider({ children }) {
  const [content, setContent] = useState("");

  return (
    <ContentSnackBar.Provider value={content}>
      <SetContentSnackBar value={setContent}>{children}</SetContentSnackBar>
    </ContentSnackBar.Provider>
  );
}
