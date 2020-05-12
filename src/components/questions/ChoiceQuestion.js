import React, { useState, useContext } from "react";
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
import QuestionMetaData from "./QuestionMetaData";
import QuestionBody from "./QuestionBody";
import MultiChoiceChoices from "./MultiChoiceOptions";
import Actions from "./Actions";
import axios from "axios";
import QuestionModel from "../../models/MultiChoiceQuestionModel";
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

export default function ChoiceQuestion() {
  const appContext = useContext(QuestionContext);
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <QuestionMetaData />
      <Divider />
      <QuestionBody />
      <Divider />
      <MultiChoiceChoices />
      <Divider />
      <Actions />
    </div>
  );
}
