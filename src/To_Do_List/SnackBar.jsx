import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import { ValueSnackBar } from "./Context/ValueSnackBar";
import { useContext, useState } from "react";
import { ContentSnackBar } from "./Context/ContentSnackBar";
export default function SnackBar() {
  const value = useContext(ValueSnackBar);
  const content = useContext(ContentSnackBar);
  const [state, setState] = useState({
    vertical: "top",
    horizontal: "center",
  });
  const { vertical, horizontal } = state;

  return (
    <Snackbar
      anchorOrigin={{ vertical, horizontal }}
      open={value}
      message={content}
      key={vertical + horizontal}
      sx={{
        "& .MuiSnackbarContent-root": {
          backgroundColor: "primary.main",
          color: "white",
        },
      }}
    />
  );
}
