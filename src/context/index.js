import React, { useState, useEffect } from "react";
import axios from "axios";
import HttpStatus from "http-status-codes";
import QuestionModel from "../models/QuestionModel";

const QuestionContext = React.createContext();

const QuestionProvider = (props) => {
  const url = "http://localhost:8080/";
  const [questionLists, setQuestionLists] = useState([]);
  const [questionList, setQuestionList] = useState("");
  const [questionListName, setQuestionListName] = useState("");

  const [question, setQuestion] = useState(QuestionModel);
  const [locale, setLocale] = useState("");
  const [questionType, setQuestionType] = useState("");
  const [questionName, setQuestionName] = useState("");
  const [questionBody, setQuestionBody] = useState("");
  const [questionDescription, setQuestionDescription] = useState("");

  const [correctAnswer, setCorrectAnswer] = useState({
    correctChoices: [0, 0],
    question: {},
  });

  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const [postingQuestion, setPostingQuestion] = useState(false);
  const [loadingQuestionLists, setLoadingQuestionLists] = useState(true);
  const [editQuestion, setEditQuestion] = useState(false);

  const fetchQuestionLists = () => {
    axios
      .get(url + "questionlistsreturndefault/")
      .then((response) => {
        setQuestionLists(response.data.questionLists);
        setQuestionList(response.data.questionLists[0]);
        setLoadingQuestionLists(false);
        setLoading(false);
      })
      .catch((error) => {
        setErrorMsg(error);
        setLoadingQuestionLists(false);
        setLoading(false);
      });
  };

  const postCorrectAnswer = (correctAnswer, question) => {
    setCorrectAnswer({
      ...correctAnswer,
      question: question,
    });
    const _correctAnswer = {
      ...correctAnswer,
      question: question,
    };
    axios
      .post(url + "multicorrectanswer", _correctAnswer, {
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        setCorrectAnswer(response.data);
        console.log(response.data);
      })
      .cath((error) => {
        setErrorMsg(error);
      });
  };

  const fetchCorrectAnswer = (question) => {
    axios
      .get(url + "multicorrectanswerbyquestion/")
      .then((response) => {
        setCorrectAnswer(response.data);
      })
      .catch((error) => {
        setErrorMsg(error);
        setLoadingQuestionLists(false);
        setLoading(false);
      });
  };

  const postQuestion = (question, questionList) => {
    if (postingQuestion) {
      return;
    }
    setPostingQuestion(true);
    axios
      .post(url + "multiquestion/" + questionList.id, question, {
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        setQuestion(response.data);
        //console.log(correctAnswer);
        console.log(response.data);
        postCorrectAnswer(correctAnswer, response.data);
        setPostingQuestion(false);
      })
      .catch((error) => {
        setErrorMsg(error);
        setPostingQuestion(false);
      });
  };

  const setQuestionCorrectSelections = (correctAnswer, newSelectedOptions) => {
    setCorrectAnswer({
      ...correctAnswer,
      correctChoices: newSelectedOptions,
    });
  };

  const addQuestionOptions = (question, newOptionBodies) => {
    setQuestion({
      ...question,
      options: newOptionBodies,
    });
  };

  const addQuestionBody = (question, newQuestionBody) => {
    setQuestion({
      ...question,
      body: newQuestionBody,
    });
    setQuestionBody(newQuestionBody);
  };

  const addQuestionName = (question, newQuestionName) => {
    setQuestion({
      ...question,
      name: newQuestionName,
    });
  };

  const addQuestionType = (question, newQuestionType) => {
    setQuestion({
      ...question,
      type: newQuestionType,
    });
  };

  const addQuestionDescription = (question, newQuestionDescription) => {
    setQuestion({
      ...question,
      description: newQuestionDescription,
    });
    setQuestionDescription(newQuestionDescription);
  };

  const addQuestionLocale = (question, newQuestionLocale) => {
    setQuestion({
      ...question,
      type: newQuestionLocale,
    });
    setLocale(newQuestionLocale);
  };

  const resetQuestion = () => {
    const emptyQuestion = QuestionModel;
    setQuestion(emptyQuestion);
    setQuestionName(emptyQuestion.name);
    setQuestionBody(emptyQuestion.body);
    setQuestionType(emptyQuestion.type);
    setLocale(emptyQuestion.locale);
    setQuestionDescription(emptyQuestion.description);
    console.log("Reset");
  };

  useEffect(() => {
    fetchQuestionLists();
  }, []);

  return (
    <QuestionContext.Provider
      value={{
        loading,
        loadingQuestionLists,
        questionLists,
        questionList,
        questionListName,
        locale,
        questionType,
        questionName,
        questionBody,
        questionDescription,
        question,
        correctAnswer,
        setQuestionCorrectSelections,
        addQuestionOptions,
        postQuestion,
        fetchQuestionLists,
        setQuestionList,
        setQuestionListName,
        addQuestionLocale,
        addQuestionType,
        addQuestionName,
        addQuestionBody,
        addQuestionDescription,
        resetQuestion,
        setEditQuestion,
        setQuestion,
      }}
    >
      {props.children}
    </QuestionContext.Provider>
  );
};

export { QuestionProvider, QuestionContext };
