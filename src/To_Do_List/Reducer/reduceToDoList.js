export default function reduceToDoList(value, action) {
  const state = action.type;
  switch (state) {
    case "add": {
      const dataSet = {
        id: Date.now(),
        isCompleted: false,
        title: action.payload.title,
      };
      const newValue = [...value, dataSet];
      return newValue;
    }

    case "delete": {
      const newValue = value.filter((task) => {
        return task.id !== action.payload.idTask;
      });
      return newValue;
    }

    case "changeState": {
      const newValue = value.map((task) => {
        if (task.id === action.payload.idTask) {
          if (task.isCompleted) {
            return { ...task, isCompleted: false };
          } else {
            return { ...task, isCompleted: true };
          }
        } else {
          return task;
        }
      });
      return newValue;
    }

    case "update": {
      const newTasks = value.map((task) => {
        if (task.id === action.payload.idTask) {
          return { ...task, title: action.payload.titleTask };
        } else {
          return task;
        }
      });
      return newTasks;
    }
    default: {
      console.log(value);
    }
  }
}
