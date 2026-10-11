import { ListOfToDo } from "./Context/ToDoContext";
import { useState, useContext, useMemo } from "react";
import { ValueSnackBar } from "./Context/ValueSnackBar";
import { ContentSnackBar } from "./Context/ContentSnackBar";
// MUI
import * as React from "react";
import Box from "@mui/material/Box";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import DeleteIcon from "@mui/icons-material/Delete";
import Grid from "@mui/material/Grid";

// Icon
import QueryBuilderIcon from "@mui/icons-material/QueryBuilder";

export default function ToDos() {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const date = new Date();
  const numberDay = date.getDate();
  const nameMonth = months[date.getMonth()];
  const year = date.getFullYear();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const [innerButton, setValueButton] = useState("");
  const [value, setValue] = useContext(ListOfToDo);
  const [appearDialogDelete, setValueAppearDelete] = useState(false);
  const [appearDialogEdit, setValueAppearEdit] = useState(false);
  const [id, setId] = useState();
  const [valueForm, setValueForm] = useState("");
  const [valueSnackBar, setValueSnackBar] = useContext(ValueSnackBar);
  const [content, setContent] = useContext(ContentSnackBar);
  const compleatStyle = {
    background: "#ECFDF3",
    border: "1px solid transparent",
    borderRadius: "10px",
    color: "#059669",
    textTransform: "capitalize",
    fontSize: {
      xs: "15px",
    },
    fontWeight: "600",
  };
  const remainingStyle = {
    border: "1px solid rgba(217,119,6,0.14)",
    background: "#FFF6ED",
    color: "#D97706",
    borderRadius: "12px",
    textTransform: "capitalize",
    fontSize: {
      xs: "13px",
    },
  };

  //Filter Tasks
  const completed = useMemo(() => {
    return value.filter((task) => {
      console.log("dkj");
      return task.isCompleted;
    });
  }, [value]);

  const remaining = useMemo(() => {
    return value.filter((task) => {
      return !task.isCompleted;
    });
  }, [value]);

  function handleDelete(id) {
    const newValue = value.filter((task) => {
      return task.id !== id;
    });
    setValue(newValue);
  }

  function handleState(id) {
    const newValue = value.map((task) => {
      if (task.id === id) {
        if (task.isCompleted) {
          return { ...task, isCompleted: false };
        } else {
          return { ...task, isCompleted: true };
        }
      } else {
        return task;
      }
    });
    setValue(newValue);
  }

  function handleUpdateTasks(id) {
    const newTasks = value.map((task) => {
      if (task.id === id) {
        return { ...task, title: valueForm };
      } else {
        return task;
      }
    });
    setValue(newTasks);
  }

  function appearDialogDel() {
    setValueAppearDelete(true);
  }

  function appearDialogEd() {
    setValueAppearEdit(true);
  }

  let dataShow = value;
  if (innerButton === "completed") {
    dataShow = completed;
  } else if (innerButton === "remaining") {
    dataShow = remaining;
  }
  const allTasks = dataShow.map((task) => {
    return (
      <Grid
        key={task.id}
        size={12}
        sx={{
          display: "grid",
          background: "#FAFCFF",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2,auto)",
          },
          justifyContent: "space-between",
          alignItems: "center",
          boxShadow: "0px 1px 2px 0px rgba(0, 0, 0, 0.4)",
          border: "1px solid rgba(238, 238, 238, 0.5)",
          borderRadius: "16px",
        }}
      >
        <CardContent
          sx={{
            display: "grid",
            gridTemplateRows: "repeat(2,auto)",
            justifyContent: "flex-start",
            gap: 1,
          }}
        >
          <Typography
            sx={{
              fontSize: {
                xs: "15px",
              },
              fontWeight: "600",
            }}
            variant="h4"
          >
            {task.title}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              display: "grid",
              placeItems: "center",
              gridTemplateColumns: "auto 1fr",
              gap: 0.5,
              fontSize: {
                xs: "12px",
              },
              textTransform: "capitalize",
            }}
          >
            <QueryBuilderIcon
              sx={{
                fontSize: {
                  xs: "12px",
                },
              }}
            />{" "}
            added {nameMonth} {numberDay} ,{year} ● {hour}:{minute}{" "}
            {hour >= 12 ? "pm" : "am"}
          </Typography>
        </CardContent>
        <CardContent
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(3,auto)",
            gap: "10px",
          }}
        >
          <Button
            sx={task.isCompleted ? compleatStyle : remainingStyle}
            variant="outlined"
            onClick={() => {
              handleState(task.id);
              setContent("Task status changed successfully");
              setValueSnackBar(true);
              setTimeout(() => {
                setValueSnackBar(false);
              }, 2000);
            }}
          >
            {task.isCompleted ? "completed" : "remaining"}
          </Button>
          <Button
            sx={{
              background: "#EFF8FF",
              border: "1px solid rgba(46,144,250,0.2)",
              borderRadius: "10px",
              color: "#2E90FA",
              textTransform: "capitalize",
              fontSize: {
                xs: "13px",
              },
              fontWeight: "600",
            }}
            variant="outlined"
            onClick={() => {
              setValueForm(task.title);
              appearDialogEd();
              setId(task.id);
            }}
          >
            edit
          </Button>
          <Button
            sx={{
              background: "#FEF2F2",
              border: "1px solid rgba(220,38,38,0.15)",
              borderRadius: "10px",
              color: "#DC2626",
              textTransform: "capitalize",
            }}
            variant="outlined"
            startIcon={<DeleteIcon />}
            onClick={() => {
              appearDialogDel();
              setId(task.id);
            }}
          >
            Delete
          </Button>
        </CardContent>
      </Grid>
    );
  });

  return (
    <>
      <Box
        sx={{
          display: "grid",
          rowGap: { xs: "10px", md: "16px" },
        }}
      >
        <Grid container variant="outlined">
          {" "}
          <Grid size={12}>
            {" "}
            <Typography
              variant="h2"
              sx={{
                textTransform: "capitalize",
                fontSize: {
                  xs: "18px",
                },
                fontWeight: "500",
              }}
            >
              my tasks
            </Typography>
          </Grid>
          <Grid size={12}>
            <Typography
              variant="body1"
              sx={{
                textTransform: "capitalize",
                fontSize: {
                  xs: "12px",
                },
                color: "#3E4850",
              }}
            >
              keep track of your daily tasks.
            </Typography>
          </Grid>
        </Grid>
        <Grid
          container
          variant="outlined"
          sx={{
            display: "grid",
            gridTemplateColumns: "1fr",
            padding: {
              xs: 1.5,
              md: 2,
              lg: 2.5,
            },
            border: "1px solid rgba(190,200,210,0.3)",
            boxShadow: "0 1px 2px 0 rgba(0,0,0,0.05)",
            borderRadius: "16px",
            backgroundColor: "white",
            gap: 3,
          }}
        >
          <Grid
            variant="contained"
            aria-label="Basic button group"
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(3,auto)",
              gap: "20px",
              width: {
                xs: "90%",
                md: "80%",
                lg: "70%",
              },
              margin: "auto",
            }}
          >
            <Button
              sx={{
                background: "#EFF8FF",
                border: "1px solid rgba(46,144,250,0.2)",
                borderRadius: "10px",
                color: "#2E90FA",
                textTransform: "capitalize",
                fontSize: {
                  xs: "15px",
                },
                fontWeight: "600",
              }}
              variant="outlined"
              value="all"
              onClick={(e) => {
                setValueButton(e.target.value);
              }}
            >
              all
            </Button>
            <Button
              sx={{
                background: "#ECFDF3",
                border: "1px solid transparent",
                borderRadius: "10px",
                color: "#059669",
                textTransform: "capitalize",
                fontSize: {
                  xs: "15px",
                },
                fontWeight: "600",
              }}
              variant="outlined"
              value="completed"
              onClick={(e) => {
                setValueButton(e.target.value);
              }}
            >
              completed
            </Button>
            <Button
              sx={{
                background: "#FFF6ED",
                border: "1px solid transparent",
                borderRadius: "10px",
                color: "#D97706",
                textTransform: "capitalize",
                fontSize: {
                  xs: "15px",
                },
                fontWeight: "600",
              }}
              variant="outlined"
              value="remaining"
              onClick={(e) => {
                setValueButton(e.target.value);
              }}
            >
              remaining
            </Button>
          </Grid>
          <Grid
            container
            sx={{
              padding: "10px 0",
              maxHeight: "400px",
              overflow: "auto",
              gap: {
                xs: 1,
                md: 1.5,
                lg: 2,
              },
              display: "grid",
              placeItems: "center",
            }}
          >
            {value.length > 0 ? allTasks : "No tasks have been added yet."}
          </Grid>
        </Grid>
      </Box>
      <React.Fragment>
        <Dialog
          open={appearDialogDelete}
          keepMounted
          aria-describedby="alert-dialog-slide-description"
          role="alertdialog"
        >
          <DialogTitle>
            {"  are you sure you want to delete this task?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              Once you delete this task, you won't be able to restore it.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              autoFocus
              onClick={() => {
                setValueAppearDelete(false);
              }}
            >
              Cancel
            </Button>
            <Button
              sx={{ color: "red" }}
              onClick={() => {
                handleDelete(id);
                setValueAppearDelete(false);
                setContent("Task deleted successfully");
                setValueSnackBar(true);
                setTimeout(() => {
                  setValueSnackBar(false);
                }, 2000);
              }}
            >
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>{" "}
      <React.Fragment>
        <Dialog open={appearDialogEdit} fullWidth>
          <DialogContent>
            <TextField
              autoFocus
              required
              margin="dense"
              id="name"
              name="email"
              label="Edit Task"
              type="text"
              fullWidth
              variant="standard"
              value={valueForm}
              onChange={(event) => {
                setValueForm(event.target.value);
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                setValueAppearEdit(false);
              }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              form="subscription-form"
              onClick={() => {
                handleUpdateTasks(id);
                setValueAppearEdit(false);
                setContent("Task updated successfully");
                setValueSnackBar(true);
                setTimeout(() => {
                  setValueSnackBar(false);
                }, 2000);
              }}
            >
              Updated
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    </>
  );
}
