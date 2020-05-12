import React, { useContext } from "react";
import TextField from "@material-ui/core/TextField";
import { QuestionContext, QuestionProvider } from "../../context/index";

export default function QuestionBody() {
  const appContext = useContext(QuestionContext);
  const { addQuestionBody, question, questionBody } = appContext;
  const questionBodyChanged = (event) => {
    addQuestionBody(question, event.target.value);
  };

  return (
    <React.Fragment>
      <TextField
        id="filled-basic"
        label="Question Body"
        value={question.body}
        onChange={questionBodyChanged}
        variant="filled"
      />
    </React.Fragment>
  );
}
