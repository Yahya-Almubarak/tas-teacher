import React, { useContext, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { Typography, FormControl } from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import Checkbox from "@material-ui/core/Checkbox";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import Button from "@material-ui/core/Button";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import { QuestionContext } from "../../context";

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

export default function QuestionMetaData() {
  const appContext = useContext(QuestionContext);
  const {
    question,
    questionName,
    questionType,
    locale,
    questionDescription,
    addQuestionLocale,
    addQuestionType,
    addQuestionName,
    addQuestionDescription,
  } = appContext;

  const handleLocaleChange = (event) => {
    addQuestionLocale(question, event.target.value);
  };

  const handleTypeChange = (event) => {
    addQuestionType(question, event.target.value);
  };

  const handleNameChange = (event) => {
    addQuestionName(question, event.target.value);
  };

  const handleDescriptionChange = (event) => {
    addQuestionDescription(question, event.target.value);
  };

  const classes = useStyles();
  return (
    <React.Fragment>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            Question Information (not to be shown to student)
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <TextField
            id="filled-basic"
            label="Name"
            variant="filled"
            value={question.name}
            onChange={handleNameChange}
          />
        </Grid>

        <Grid item xs={4}>
          <FormControl>
            <InputLabel id="demo-simple-select-label">Type</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              variant="filled"
              value={question.type}
              onChange={handleTypeChange}
            >
              <MenuItem value={"MULTI_SELECT_MULTI_CHOICE"}>
                multiple selection
              </MenuItem>
              <MenuItem value={"SINGLE_SELECT_MULTI_CHOICE"}>
                single selection
              </MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid xs={4}>
          <FormControl>
            <InputLabel id="demo-simple-select-label">Locale</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              variant="filled"
              value={question.locale}
              onChange={handleLocaleChange}
            >
              <MenuItem value={"en"}>en</MenuItem>
              <MenuItem value={"fi"}>fi</MenuItem>
              <MenuItem value={"ar"}>ar</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="filled-basic"
            label="Description"
            variant="filled"
            value={question.description}
            onChange={handleDescriptionChange}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            id="filled-basic"
            label="Presentation time (min.)"
            variant="filled"
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            id="filled-basic"
            label="Time of answer (min.)"
            variant="filled"
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            id="filled-basic"
            label="Total time (min.)"
            variant="filled"
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
