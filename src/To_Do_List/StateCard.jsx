// MUI
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

export default function StateCard({
  title,
  count,
  icon,
  color,
  backGroundColor,
}) {
  return (
    <Card
      sx={{
        backgroundColor: "white",
        display: "flex",
        gridTemplateColumns: "auto auto",
        alignItems: "center",
        justifyContent: "space-between",
        border: "1px solid rgba(190,200,210,0.3)",
        boxShadow: "0 1px 2px 0 rgba(0,0,0,0.05)",
        borderRadius: "16px",
      }}
    >
      <CardContent>
        <Typography
          variant="h5"
          sx={{
            fontSize: { xs: "12px", md: "14px" },
            fontWeight: "600",
            textTransform: "uppercase",
          }}
        >
          {title}
        </Typography>
        <Typography component="div">
          <Typography component="div">
            <Typography
              component="span"
              sx={{
                fontSize: { xs: "22px", md: "24px" },
                fontWeight: "bold",
              }}
            >
              {count}
            </Typography>{" "}
            <Typography
              component="span"
              sx={{ color: "#6E7881", fontSize: { xs: "13px", md: "15px" } }}
            >
              items
            </Typography>
          </Typography>
        </Typography>
      </CardContent>

      <CardContent>
        <Box
          sx={{
            width: "40px",
            height: "40px",
            borderRadius: "12px",
            display: "grid",
            placeItems: "center",
            backgroundColor: backGroundColor,
            color: color,
          }}
        >
          {icon}
        </Box>
      </CardContent>
    </Card>
  );
}
