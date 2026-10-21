import "./App.css";
import ToDoList from "./To_Do_List/ToDoList";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import SnackBar from "./To_Do_List/SnackBar";
import ValueSnackBarProvider from "./To_Do_List/Context/ValueSnackBar";
import SnackbarProvider from "./To_Do_List/Context/ContentSnackBar";
import ListOfToDoProvider from "./To_Do_List/Context/ToDoContext";
function App() {
  const theme = createTheme({
    typography: {
      fontFamily: "Plus Jakarta Sans",
    },
  });

  return (
    <div className="App">
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
