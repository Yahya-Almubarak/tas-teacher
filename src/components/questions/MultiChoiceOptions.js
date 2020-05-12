import React, { useState, useEffect, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { Typography, Radio, IconButton } from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import Checkbox from "@material-ui/core/Checkbox";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import Button from "@material-ui/core/Button";
import RadioGroup from "@material-ui/core/Radio";
import { QuestionContext, QuestionProvider } from "../../context";

export default function MultiChoiceChoices() {
  const appContext = useContext(QuestionContext);
  const {
    question,
    correctAnswer,
    setQuestionCorrectSelections,
    addQuestionOptions,
  } = appContext;

  const choicesIndexInitializer = (options) => {
    var newChoicesIndecis = [];
    for (var i = 0; i < options.length; i++) {
      newChoicesIndecis.push(i);
    }
    console.log(newChoicesIndecis);
    return newChoicesIndecis;
  };

  const initialState = {
    multiChoice: true,
    choices: choicesIndexInitializer(question.options),
    selectedOption: -1,
    selectedOptions: correctAnswer.correctChoices,
    optionBodies: question.options,
  };

  const [state, setState] = useState(initialState);
  /*
  setState({
    ...state,
    choices: question.options
      ? [0, 1]
      : choicesIndexInitializer(question.options),
  }); */

  const handleChange = (event) => {
    var newSelectedOptions = state.selectedOptions;
    const index = event.target.id;
    newSelectedOptions[index] = state.selectedOptions[index] == 0 ? 1 : 0;
    setState({
      ...state,
      selectedOption: index,
      selectedOptions: newSelectedOptions,
    });
    setQuestionCorrectSelections(question, newSelectedOptions);
  };

  const addButtonClicked = (index) => () => {
    const optionBodiesBeforeIndex = state.optionBodies.slice(0, index + 1);
    const optionBodiesAfterIndex = state.optionBodies.slice(index + 1);
    const emptyOptionBody = [""];
    const newOptionBodies = optionBodiesBeforeIndex
      .concat(emptyOptionBody)
      .concat(optionBodiesAfterIndex);

    //
    const selectedOptionsBeforeIndex = state.selectedOptions.slice(
      0,
      index + 1
    );
    const selectedOptionsAfterIndex = state.selectedOptions.slice(index + 1);
    const emptySelectedOption = [0];
    const newSelectedOptions = selectedOptionsBeforeIndex
      .concat(emptySelectedOption)
      .concat(selectedOptionsAfterIndex);

    //
    var newChoices = [];
    for (var i = 0; i < newOptionBodies.length; i++) {
      newChoices.push(i);
    }
    /*
    const newChoices = [
      ...state.choices,
      state.choices[state.choices.length - 1] + 1,
    ];
    const newOptionBodies = [...state.optionBodies, ""];*/
    setState({
      choices: newChoices,
      selectedOption: state.selectedOption,
      optionBodies: newOptionBodies,
      multiChoice: state.multiChoice,
      selectedOptions: newSelectedOptions,
    });
  };

  const removeButtonClicked = (index) => () => {
    var selectedOption = state.selectedOption;
    if (selectedOption == index) {
      selectedOption = -1;
    }
    var newOptionBodies = [];
    // set removed option to 0 in selectedOptions
    var newSelectedOptions = state.selectedOptions;
    newSelectedOptions[index] = 0;
    if (state.choices.length < 3) {
      /* const newOptionBodies = { ...state.optionBodies };
      newOptionBodies[index] = "";*/
      const emptyOption = [""];

      if (index === 0) {
        newOptionBodies = emptyOption.concat(state.optionBodies[1]);
      } else {
        newOptionBodies = newOptionBodies
          .concat(state.optionBodies[0])
          .concat(emptyOption);
      }
      setState({
        multiChoice: state.multiChoice,
        choices: state.choices,
        selectedOption: selectedOption,
        optionBodies: newOptionBodies,
        selectedOptions: state.selectedOptions,
      });
    } else {
      if (selectedOption > index) {
        selectedOption = selectedOption - 1;
      }
      const newChoices = [];
      for (var i = 0; i < state.choices.length - 1; i++) {
        newChoices.push(i);
      }

      // to remove from optionBodies
      const optionBodiesBeforeIndex = state.optionBodies.slice(0, index);
      const optionsAfterIndex = state.optionBodies.slice(index + 1);
      newOptionBodies = optionBodiesBeforeIndex.concat(optionsAfterIndex);

      // to remove from selectedOptions
      const selectedOptionsBeforeIndex = state.selectedOptions.slice(0, index);
      const selectedOptionsAfterIndex = state.selectedOptions.slice(index + 1);
      newSelectedOptions = selectedOptionsBeforeIndex.concat(
        selectedOptionsAfterIndex
      );

      setState({
        ...state,
        choices: newChoices,
        selectedOption: selectedOption,
        optionBodies: newOptionBodies,
        selectedOptions: newSelectedOptions,
      });
    }
  };

  const optionBodyChanged = (event) => {
    const index = event.target.id;
    const value = event.target.value;
    var newOptionBodies = state.optionBodies;
    newOptionBodies[index] = value;
    /*
    const newOptionBodies = state.optionBodies
      .slice(0, index)
      .concat([value])
      .concat(state.optionBodies.slice(index)); */
    setState({
      ...state,
      optionBodies: newOptionBodies,
    });
    addQuestionOptions(question, newOptionBodies);
  };

  return (
    <React.Fragment>
      {state.choices.map((choice) => {
        return (
          <Grid container key={choice} question>
            <Grid item xs={1}>
              {state.multiChoice ? (
                <Checkbox
                  id={choice}
                  checked={state.selectedOptions[choice] == 1}
                  name="checkedB"
                  color="primary"
                  onChange={handleChange}
                />
              ) : (
                <Radio
                  id={choice}
                  checked={state.selectedOption == choice}
                  onChange={handleChange}
                  value={choice}
                />
              )}
            </Grid>
            <Grid item xs={9} sm={9}>
              <TextField
                id={choice}
                label="Option body"
                variant="filled"
                onChange={optionBodyChanged}
                value={question.options[choice]}
                fullWidth
              />
            </Grid>
            <Grid item xs={1}>
              <IconButton
                color="primary"
                aria-label="add"
                onClick={removeButtonClicked(choice)}
              >
                <RemoveIcon />
              </IconButton>
            </Grid>
            <Grid item xs={1}>
              <IconButton
                color="primary"
                aria-label="add"
                onClick={addButtonClicked(choice)}
              >
                <AddIcon />
              </IconButton>
            </Grid>
          </Grid>
        );
      })}
    </React.Fragment>
  );
}
