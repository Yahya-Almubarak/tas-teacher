import React, { useContext } from "react";
import { Grid, Button } from "@material-ui/core";
import { QuestionContext, QuestionProvider } from "../../context/index";

export default function Actions() {
  const appContext = useContext(QuestionContext);
  const { question, questionList, postQuestion, resetQuestion } = appContext;

  const saveQuestion = () => {
    postQuestion(question, questionList);
  };

  const newQuestion = () => {
    resetQuestion();
  };
  return (
    <Grid container>
      <Grid xs={4}>
        <Button variant="contained" color="primary" onClick={newQuestion}>
          Reset Question
        </Button>
      </Grid>
      <Grid xs={4}>
        <Button variant="contained" color="primary" onClick={saveQuestion}>
          Save
        </Button>
      </Grid>
    </Grid>
  );
}
