import "./App.css";
import ToDoList from "./To_Do_List/ToDoList";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import SnackBar from "./To_Do_List/SnackBar";
import ValueSnackBarProvider from "./To_Do_List/Context/ValueSnackBar";
import SnackbarProvider from "./To_Do_List/Context/ContentSnackBar";
import ListOfToDoProvider from "./To_Do_List/Context/ToDoContext";
import LoadingButtons from "./To_Do_List/Loading";
import { useEffect, useState } from "react";
function App() {
  const [apper, setValue] = useState(true);
  const theme = createTheme({
    typography: {
      fontFamily: "Plus Jakarta Sans",
    },
  });
  useEffect(() => {
    const loading = () => {
      setValue(false);
    };
    if (document.readyState === "complete") {
      loading();
    } else {
      window.addEventListener("load", loading);
    }
  }, []);

  return (
    <div className="App">
      {apper ? <LoadingButtons /> : ""}
      <ThemeProvider theme={theme}>
        <SnackbarProvider>
          <ValueSnackBarProvider>
            <ListOfToDoProvider>
              {" "}
              <ToDoList />
            </ListOfToDoProvider>

            <SnackBar />
          </ValueSnackBarProvider>
        </SnackbarProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;
