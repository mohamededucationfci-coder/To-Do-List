import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

// Icon
import DateRangeIcon from "@mui/icons-material/DateRange";

export default function Head() {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

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
  const nameDay = days[date.getDay()];
  const nameMonth = months[date.getMonth()];

  return (
    <Card
      sx={{
        background: "rgba(232,230,230,0.05)",
        display: "grid",
        gridTemplateColumns: {
          xs: "1fr",
          md: "repeat(2,auto)",
        },
        justifyContent: "space-between",
        alignItems: "center",
        borderRadius: "16px",
        border: "1px solid rgba(190,200,210,0.3)",
        boxShadow: "0 1px 2px 0 rgba(0,0,0,0.05)",
      }}
    >
      <CardContent sx={{}}>
        <Typography
          variant="h1"
          sx={{
            fontSize: {
              xs: "24px",
            },
            fontWeight: "bold",
            textTransform: "capitalize",
          }}
        >
          todo list
        </Typography>
        <Typography
          variant="body1"
          sx={{
            fontSize: {
              xs: "13px",
            },
            color: "#6E7881",
            textTransform: "capitalize",
          }}
        >
          organize your tasks, stay focused, and get things done.
        </Typography>
      </CardContent>
      <CardContent sx={{ display: "grid", justifyContent: "flex-end" }}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(2,auto)",
            gap: "10px",
            alignItems: "center",
            backgroundColor: "#FFFFFF",
            border: "2px solid  #2E90FA",
            color: "#2E90FA",
            borderRadius: "16px",
            padding: "6px",
          }}
        >
          <DateRangeIcon
            sx={{
              color: "#2E90FA",
              padding: "10px",
              background: "rgba(46,144,250,0.16)",
              borderRadius: "12px",
            }}
          />
          <Typography sx={{ fontSize: "13px" }}>
            {nameDay} , {numberDay} {nameMonth}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
