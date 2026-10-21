import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

export default function Loading() {
  return (
    <Box
      sx={{
        position: "absolute",
        inset: 0,
        display: "grid",
        placeItems: "center",
        bgcolor: "rgba(255, 255, 255, 0.9)",
        zIndex: 9999,
      }}
    >
      <CircularProgress />
    </Box>
  );
}
