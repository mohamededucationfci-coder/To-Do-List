import { Dispatch, ValueTasks } from "./Context/ToDoContext";
import { useState, useContext, useMemo } from "react";
import { SetValueSnackBar } from "./Context/ValueSnackBar";
import { SetContentSnackBar } from "./Context/ContentSnackBar";
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
  const value = useContext(ValueTasks);
  const dispatch = useContext(Dispatch);
  const [appearDialogDelete, setValueAppearDelete] = useState(false);
  const [appearDialogEdit, setValueAppearEdit] = useState(false);
  const [id, setId] = useState();
  const [active, setActive] = useState(0);
  const [valueForm, setValueForm] = useState("");
  const setValueSnackBar = useContext(SetValueSnackBar);
  const setContent = useContext(SetContentSnackBar);
  const compleatStyle = {
    background: "#ECFDF3",
    border: "1px solid rgba(5,150,105,0.14)",
    borderRadius: "10px",
    color: "#059669",
    textTransform: "capitalize",
    fontSize: {
      xs: "12px",
      md: "14px",
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
      xs: "12px",
      md: "14px",
    },
    fontWeight: "600",
  };

  //Filter Tasks
  const completed = useMemo(() => {
    return value.filter((task) => {
      return task.isCompleted;
    });
  }, [value]);

  const remaining = useMemo(() => {
    return value.filter((task) => {
      return !task.isCompleted;
    });
  }, [value]);
  // function handleSort(){}

  function handleDelete(id) {
    dispatch({ type: "delete", payload: { idTask: id } });
  }

  function handleState(id) {
    dispatch({ type: "changeState", payload: { idTask: id } });
  }

  function handleUpdateTasks(id) {
    dispatch({ type: "update", payload: { idTask: id, titleTask: valueForm } });
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
          outline: "none",
          background: "#FAFCFF",
          boxShadow: "0px 0px 4px 0 rgba(0,0,0,0.05)",
          border: "1px solid rgba(238, 238, 238, 0.5)",
          borderRadius: "16px",
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2,auto)",
          },
          justifyContent: "space-between",
          alignItems: "center",
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
              textTransform: "capitalize",
              fontSize: {
                xs: "16px",
                md: "18px",
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
                md: "13px",
              },
              textTransform: "capitalize",
              color: "#6E7881",
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
                xs: "12px",
                md: "14px",
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
              fontWeight: "600",
              fontSize: {
                xs: "12px",
                md: "14px",
              },
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
                  xs: "22px",
                  md: "24px",
                },
                fontWeight: "600",
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
                  xs: "14px",
                  md: "16px",
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
              className={active === 0 ? "active" : ""}
              sx={{
                background: "#EFF8FF",
                border: "none",
                borderRadius: "10px",
                color: "#2E90FA",
                textTransform: "capitalize",
                fontSize: {
                  xs: "14px",
                  md: "16px",
                },
                fontWeight: "600",
              }}
              variant="outlined"
              value="all"
              onClick={(e) => {
                setValueButton(e.target.value);
                setActive(0);
                console.log(active);
              }}
            >
              all
            </Button>
            <Button
              className={active === 1 ? "active" : ""}
              sx={{
                background: "#ECFDF3",
                border: "1px solid transparent",
                borderRadius: "10px",
                color: "#059669",
                textTransform: "capitalize",
                fontSize: {
                  xs: "14px",
                  md: "16px",
                },
                fontWeight: "600",
              }}
              variant="outlined"
              value="completed"
              onClick={(e) => {
                setValueButton(e.target.value);
                setActive(1);
              }}
            >
              completed
            </Button>
            <Button
              className={active === 2 ? "active" : ""}
              sx={{
                background: "#FFF6ED",
                border: "1px solid transparent",
                borderRadius: "10px",
                color: "#D97706",
                textTransform: "capitalize",
                fontSize: {
                  xs: "14px",
                  md: "16px",
                },
                fontWeight: "600",
              }}
              variant="outlined"
              value="remaining"
              onClick={(e) => {
                setValueButton(e.target.value);
                setActive(2);
              }}
            >
              remaining
            </Button>
          </Grid>
          <Grid
            container
            sx={{
              padding: "10px 5px",
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
            {dataShow.length > 0 ? (
              allTasks
            ) : (
              <Typography
                component="div"
                sx={{
                  height: "60px",
                  outline: "none",
                  background: "#FAFCFF",
                  boxShadow: "0px 0px 4px 0 rgba(195, 23, 23, 0.05)",
                  border: "1px solid rgba(238, 238, 238, 0.5)",
                  borderRadius: "16px",
                  width: {
                    xs: "100%",
                    md: "90%",
                  },
                  display: "grid",
                  placeItems: "center",
                }}
              >
                {" "}
                <Typography
                  sx={{
                    fontSize: {
                      md: "18px",
                    },
                  }}
                >
                  No tasks have been added yet.
                </Typography>
              </Typography>
            )}
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
