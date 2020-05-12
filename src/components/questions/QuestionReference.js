import React, { useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { Typography } from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import Checkbox from "@material-ui/core/Checkbox";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { QuestionContext } from "../../context/index";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

export default function QuestionReference() {
  const classes = useStyles();
  const appContext = useContext(QuestionContext);
  const { questionLists, loadingQuestionLists, setQuestionList } = appContext;

  const handleChange = (event) => {
    setQuestionList(event.target.value);
  };

  return (
    <React.Fragment>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            Question reference Information
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <InputLabel id="demo-simple-select-label">Creater</InputLabel>
          <Select labelId="demo-simple-select-label" id="demo-simple-select">
            <MenuItem value={10}>Me</MenuItem>
          </Select>
        </Grid>
        <Grid item xs={6}>
          <InputLabel id="demo-simple-select-label">Question List</InputLabel>
          <>
            {" "}
            {loadingQuestionLists ? (
              <div>LOADING</div>
            ) : (
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                onChange={handleChange}
              >
                {questionLists.map((questionList) => {
                  return (
                    <MenuItem value={questionList}>
                      {questionList.name}
                    </MenuItem>
                  );
                })}
              </Select>
            )}
          </>
        </Grid>
        <Grid item xs={6}>
          <InputLabel id="demo-simple-select-label">Test</InputLabel>
          <Select labelId="demo-simple-select-label" id="demo-simple-select">
            <MenuItem value={10}>Default test</MenuItem>
          </Select>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
