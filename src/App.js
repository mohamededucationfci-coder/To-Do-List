import "./App.css";
import ToDoList from "./To_Do_List/ToDoList";
import { ListOfToDo } from "./To_Do_List/Context/ToDoContext";
import { useState, useEffect } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import SnackBar from "./To_Do_List/SnackBar";
import { ValueSnackBar } from "./To_Do_List/Context/ValueSnackBar";
import { ContentSnackBar } from "./To_Do_List/Context/ContentSnackBar";
// import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';

function App() {
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState("");

  const theme = createTheme({
    typography: {
      fontFamily: "Cairo",
    },
  });
  const [tasksList, setTask] = useState(() => {
    return JSON.parse(window.localStorage.getItem("Tasks")) || [];
  });

  useEffect(() => {
    window.localStorage.setItem("Tasks", JSON.stringify(tasksList));
  }, [tasksList]);
  return (
    <div className="App">
      <ContentSnackBar.Provider value={[content, setContent]}>
        <ValueSnackBar.Provider value={[open, setOpen]}>
          <ThemeProvider theme={theme}>
            <ListOfToDo.Provider value={[tasksList, setTask]}>
              {" "}
              <ToDoList />
            </ListOfToDo.Provider>

            <SnackBar />
          </ThemeProvider>
        </ValueSnackBar.Provider>
      </ContentSnackBar.Provider>
    </div>
  );
}

export default App;
