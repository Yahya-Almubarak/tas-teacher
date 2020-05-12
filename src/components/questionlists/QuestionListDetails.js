import React from "react";
import { Grid, Typography } from "@material-ui/core";

function QuestionListDetails({ questionList }) {
  return (
    <div>
      <Grid container>
        <Grid container>
          <Grid item>
            <Typography variant="h5">Name:</Typography>
          </Grid>
          <Grid item>
            <Typography variant="h5">{questionList.name}</Typography>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item>
            <Typography variant="h5">Description:</Typography>
          </Grid>
          <Grid item>
            <Typography variant="h5">{questionList.description}</Typography>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item>
            <Typography variant="h5">Creation Time:</Typography>
          </Grid>
          <Grid item>
            <Typography variant="h5">{questionList.creationTime}</Typography>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item>
            <Typography variant="h5">Last ModificationTime:</Typography>
          </Grid>
          <Grid item>
            <Typography variant="h5">
              {questionList.lastModificationTime}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default QuestionListDetails;
