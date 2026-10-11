import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import { ValueSnackBar } from "./Context/ValueSnackBar";
import { useContext } from "react";
import { ContentSnackBar } from "./Context/ContentSnackBar";
export default function SnackBar() {
  const [value, setValue] = useContext(ValueSnackBar);
  const [content, setContent] = useContext(ContentSnackBar);
  const [state, setState] = React.useState({
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
