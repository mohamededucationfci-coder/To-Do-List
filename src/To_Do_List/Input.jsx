// MUI
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";

// Hook
import { useState, useContext } from "react";
import { ValueSnackBar } from "./Context/ValueSnackBar";
import { ContentSnackBar } from "./Context/ContentSnackBar";
import { ListOfToDo } from "./Context/ToDoContext";
export default function Input() {
  const [valueInput, setValue] = useState("");
  const [valueTasks, setValueToDo] = useContext(ListOfToDo);
  const [content, setContent] = useContext(ContentSnackBar);
  const [value, setValueSnackBar] = useContext(ValueSnackBar);
  function handleAddTask() {
    setValueToDo([
      ...valueTasks,
      {
        id: Date.now(),
        isCompleted: false,
        title: valueInput,
      },
    ]);
    setValue("");
    setContent("New task added successfully");
    setValueSnackBar(true);
    setTimeout(() => {
      setValueSnackBar(false);
    }, 2000);
  }
  return (
    <Box>
      <Grid
        container
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "1fr auto",
          },
          gap: { xs: "8px", md: "10px", lg: "12px" },
        }}
      >
        <Grid>
          {" "}
          <TextField
            sx={{
              width: "100%",
              backgroundColor: "#FFFFFF",
              border: "1px solid rgba(190,200,210,0.3)",
              boxShadow: "0 1px 2px 0 rgba(0,0,0,0.05)",
              borderRadius: "16px",
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  border: "1px solid rgba(238, 238, 238, 0.5)",
                },

                "&:hover fieldset": {
                  border: "1px solid rgba(238, 238, 238, 0.8)",
                },

                "&.Mui-focused fieldset": {
                  border: "2px solid #1976d2",
                },
              },
            }}
            id="outlined-basic"
            label="Task"
            variant="outlined"
            value={valueInput}
            onChange={(event) => {
              setValue(event.target.value);
            }}
          />
        </Grid>
        <Grid>
          <Button
            sx={{
              width: {
                xs: "100%",
                sm: "130px",
              },
              height: "100%",
              textTransform: "capitalize",
              borderRadius: "16px",
              fontSize: {
                xs: "14px",
              },
            }}
            variant="contained"
            onClick={() => {
              handleAddTask();
            }}
            disabled={valueInput.length === 0}
          >
            add task
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
