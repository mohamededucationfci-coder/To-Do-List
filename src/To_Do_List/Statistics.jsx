// Hook
import { useContext } from "react";

// Components
import StateCard from "./StateCard";
import { ListOfToDo } from "./Context/ToDoContext";

// MUI
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

// Icon
import RuleIcon from "@mui/icons-material/Rule";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import QueryBuilderIcon from "@mui/icons-material/QueryBuilder";
export default function Statistics() {
  const [tasks, setTask] = useContext(ListOfToDo);
  let numberOfCompleteTask = 0;
  let numberOfRemainingTask = 0;
  const CompleteTask = tasks.forEach((task) => {
    if (task.isCompleted) {
      numberOfCompleteTask++;
    } else {
      numberOfRemainingTask++;
    }
  });
  const dataStateCard = [
    {
      id: 1,
      title: "total task",
      icon: <RuleIcon />,
      count: tasks.length,
      color: "#2E90FA",
      backGroundColor: "#EFF8FF",
    },
    {
      id: 2,
      title: "completed",
      icon: <TaskAltIcon />,
      count: numberOfCompleteTask,
      color: "#059669",
      backGroundColor: "#ECFDF3",
    },
    {
      id: 3,

      title: "remaining",
      icon: <QueryBuilderIcon />,
      count: numberOfRemainingTask,
      color: "#D97706",
      backGroundColor: "#FFF6ED",
    },
  ];
  const cardsList = dataStateCard.map((card) => {
    return (
      <Grid key={card.id} size={{ xs: 12, sm: 6, md: 4 }}>
        <StateCard
          key={card.id}
          title={card.title}
          count={card.count}
          icon={card.icon}
          color={card.color}
          backGroundColor={card.backGroundColor}
        />
      </Grid>
    );
  });
  return (
    <Box>
      <Grid
        container
        spacing={{
          xs: 1.5,
          md: 2,
          lg: 2,
        }}
      >
        {cardsList}
      </Grid>
    </Box>
  );
}
