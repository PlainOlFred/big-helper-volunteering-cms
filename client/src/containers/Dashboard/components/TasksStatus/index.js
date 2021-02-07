import Recat from "react";
import { makeStyles } from "@material-ui/core/styles";

import Paper from "@material-ui/core/Paper";


import { Doughnut } from "react-chartjs-2";

const useStyles = makeStyles((theme) => ({
  root: {},
}));

function TasksStatus(props) {
  const classes = useStyles();

  const taskData = (assigned, progress, complete) => ({
    datasets: [
      {
        data: [assigned, progress, complete],
        backgroundColor: ["red", "green", "blue"],
      },
    ],
    labels: ["Assigned", "Progress", "Completed"],
  });

  return (
    <Paper>
      <h1>Tasks Status</h1>
      <Doughnut
        data={() => taskData(10, 20, 10)}
        height={50}
        width={50}
        options={{
          cutoutPercentage: 0,
          rotation: -0.75 * Math.PI,
          circumference: 2 * Math.PI,
        }}
      />
    </Paper>
  );
}

export default TasksStatus;
