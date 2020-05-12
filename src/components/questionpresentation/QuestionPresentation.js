import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Typography,
  Checkbox,
  Radio,
  TextField,
  IconButton,
  Paper,
  FormControl,
  InputLabel,
  Input,
  FormHelperText,
  Button,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import SaveIcon from "@material-ui/icons/Save";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  paper: {
    width: "100%",
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1,
  },
  textField: {
    width: "100%",
  },
  button: {
    margin: theme.spacing(1),
  },
}));

function QuestionPresentation(props) {
  const [question, setQuestion] = useState(props.question);
  const [correctAnswer, setCorrectAnswer] = useState(props.correctAnswer);
  const [selections, setSelections] = useState(
    props.correctAnswer.correctChoices
  );
  const [options, setOptions] = useState(props.question.options);
  const [optionsIndecis, setOptionsIndecis] = useState(() => {
    let indecis = [];
    for (let index = 0; index < options.length; index++) {
      indecis = indecis.concat(index);
    }
    return indecis;
  });

  const handleQuestionChange = (name) => (event) => {
    setQuestion({ ...question, [name]: event.target.value });
  };

  const handleOptionsChange = (index) => (event) => {
    const oldOptions = question.options;
    oldOptions[index] = event.target.value;
    setQuestion({ ...question, options: oldOptions });
    console.log(question);
  };

  const addButtonClicked = (index) => () => {
    console.log(index);
    const optionsBeforeIndex = options.slice(0, index + 1);
    const optionAfterIndex = options.slice(index + 1);
    const emptyOption = [""];
    const newOptions = optionsBeforeIndex
      .concat(emptyOption)
      .concat(optionAfterIndex);

    //
    const selectedOptionsBeforeIndex = options.slice(0, index + 1);
    const selectedOptionsAfterIndex = options.slice(index + 1);
    const emptySelectedOption = [""];
    const newSelectedOptions = selectedOptionsBeforeIndex
      .concat(emptySelectedOption)
      .concat(selectedOptionsAfterIndex);

    //
    var newOptionsIndecis = [];
    for (var i = 0; i < newOptions.length; i++) {
      newOptionsIndecis.push(i);
    }
    setOptions(newSelectedOptions);
    setOptionsIndecis(newOptionsIndecis);
  };

  const removeButtonClicked = (index) => () => {
    console.log(index);
    var newOptions = [];
    var newSelections = selections;
    if (options.length < 3) {
      const emptyOption = [""];
      if (index === 0) {
        newOptions = emptyOption.concat(options[1]);
      } else {
        newOptions = newOptions.concat(options[0]).concat(emptyOption);
      }
    } else {
      // to remove from options
      const optionsBeforeIndex = options.slice(0, index);
      const optionsAfterIndex = options.slice(index + 1);
      newOptions = optionsBeforeIndex.concat(optionsAfterIndex);

      // to remove from selections
      const selectionsBeforeIndex = selections.slice(0, index);
      const selectionsAfterIndex = selections.slice(index + 1);
      newSelections = selectionsBeforeIndex.concat(selectionsAfterIndex);
    }
    var newOptionsIndecis = [];
    for (var i = 0; i < newOptions.length; i++) {
      newOptionsIndecis.push(i);
    }
    setOptions(newOptions);
    setSelections(newSelections);
    setOptionsIndecis(newOptionsIndecis);
  };

  const classes = useStyles();

  useEffect(() => {
    setQuestion(props.question);
    setCorrectAnswer(props.correctAnswer);
    setSelections(props.correctAnswer.correctChoices);
    setOptions(props.question.options);
  }, [props.question, props.correctAnswer]);
  return (
    <div>
      <Grid container xs={12}>
        <Paper className={classes.paper}>
          <form>
            <Grid container xs={12}>
              <Grid container xs={12}>
                <Grid item xs={3}>
                  <Paper className={classes.paper}>
                    <Typography variant="subtitle1">Name:</Typography>
                  </Paper>
                </Grid>
                <Grid item xs={9}>
                  <Paper className={classes.paper}>
                    <TextField
                      onChange={handleQuestionChange("name")}
                      className={classes.textField}
                      value={question.name}
                    />
                  </Paper>
                </Grid>
              </Grid>
              <Grid container xs={12}>
                <Grid item xs={3}>
                  <Paper className={classes.paper}>
                    <Typography variant="subtitle1">Description:</Typography>
                  </Paper>
                </Grid>
                <Grid item xs={9}>
                  <Paper className={classes.paper}>
                    <TextField
                      onChange={handleQuestionChange("description")}
                      className={classes.textField}
                      value={question.description}
                    />
                  </Paper>
                </Grid>
              </Grid>
              <Grid container xs={12}>
                <Grid item xs={3}>
                  <Paper className={classes.paper}>
                    <Typography variant="subtitle1">Local:</Typography>
                  </Paper>
                </Grid>
                <Grid item xs={9}>
                  <Paper className={classes.paper}>
                    <TextField
                      onChange={handleQuestionChange("local")}
                      className={classes.textField}
                      value={question.local}
                    />
                  </Paper>
                </Grid>
              </Grid>
              <Grid container xs={12}>
                <Grid item xs={3}>
                  <Paper className={classes.paper}>
                    <Typography variant="subtitle1">
                      Time of presentation:
                    </Typography>
                  </Paper>
                </Grid>
                <Grid item xs={9}>
                  <Paper className={classes.paper}>
                    <TextField
                      onChange={handleQuestionChange("timeToPresent")}
                      className={classes.textField}
                      value={question.timeToPresent}
                    />
                  </Paper>
                </Grid>
              </Grid>
              <Grid container xs={12}>
                <Grid item xs={3}>
                  <Paper className={classes.paper}>
                    <Typography variant="subtitle1">
                      Comment on Time:
                    </Typography>
                  </Paper>
                </Grid>
                <Grid item xs={9}>
                  <Paper className={classes.paper}>
                    <TextField
                      onChange={handleQuestionChange("commentOnTime")}
                      className={classes.textField}
                      value={question.commentOnTime}
                    />
                  </Paper>
                </Grid>
              </Grid>
              <Grid container xs={12}>
                <Grid item xs={3}>
                  <Paper className={classes.paper}>
                    <Typography variant="subtitle1">
                      Comment on Question:
                    </Typography>
                  </Paper>
                </Grid>
                <Grid item xs={9}>
                  <Paper className={classes.paper}>
                    <TextField
                      onChange={handleQuestionChange("commentOnQuestion")}
                      className={classes.textField}
                      value={question.commentOnQuestion}
                    />
                  </Paper>
                </Grid>
              </Grid>
              <Grid container xs={12}>
                <Grid item xs={3}>
                  <Paper className={classes.paper}>
                    <Typography variant="subtitle1">
                      Comment on Answering:
                    </Typography>
                  </Paper>
                </Grid>
                <Grid item xs={9}>
                  <Paper className={classes.paper}>
                    <TextField
                      onChange={handleQuestionChange("commentOnAnswering")}
                      className={classes.textField}
                      value={question.commentOnAnswering}
                    />
                  </Paper>
                </Grid>
              </Grid>
              <Grid container xs={12}>
                <Grid item xs={3}>
                  <Paper className={classes.paper}>
                    <Typography variant="subtitle1">Body:</Typography>
                  </Paper>
                </Grid>
                <Grid item xs={9}>
                  <Paper className={classes.paper}>
                    <TextField
                      onChange={handleQuestionChange("body")}
                      className={classes.textField}
                      value={question.body}
                    />
                  </Paper>
                </Grid>
              </Grid>
              <Grid container xs={12}>
                {optionsIndecis.map((index) => {
                  return (
                    <Grid container key={index}>
                      <Grid item xs={1}>
                        {question.type === "MULTI_SELECT_MULTI_CHOICE" ? (
                          <Paper className={classes.paper}>
                            <Checkbox
                              id={index}
                              checked={selections[index] === 1}
                              name="checkedB"
                              color="primary"
                            />
                          </Paper>
                        ) : (
                          <Paper className={classes.paper}>
                            <Radio
                              id={index}
                              checked={selections[index] === 1}
                              value={index}
                            />
                          </Paper>
                        )}
                      </Grid>
                      <Grid item xs={9}>
                        <Paper className={classes.paper}>
                          <TextField
                            onChange={handleOptionsChange(index)}
                            className={classes.textField}
                            value={options[index]}
                          />
                        </Paper>
                      </Grid>
                      <Grid item xs={1}>
                        <IconButton
                          color="primary"
                          aria-label="add"
                          onClick={removeButtonClicked(index)}
                        >
                          <RemoveIcon />
                        </IconButton>
                      </Grid>
                      <Grid item xs={1}>
                        <IconButton
                          color="primary"
                          aria-label="add"
                          onClick={addButtonClicked(index)}
                        >
                          <AddIcon />
                        </IconButton>
                      </Grid>
                    </Grid>
                  );
                })}
              </Grid>
              <Grid container>
                <Grid item xs={3}>
                  <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    className={classes.button}
                    startIcon={<SaveIcon />}
                  >
                    Save
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Grid>
    </div>
  );
}

export default QuestionPresentation;
