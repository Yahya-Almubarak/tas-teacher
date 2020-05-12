import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import QuestionListTable from "./components/questionlists/QuestionListTable";
import QuestionListDetails from "./components/questionlists/QuestionListDetails";
import QuestionsTable from "./components/questionlists/QuestionsTable";
import QuestionPresentation from "./components/questionpresentation/QuestionPresentation";

function App() {
  const url = "http://localhost:8080/";

  const [questionLists, setQuestionLists] = useState([]);
  const [questionList, setQuestionList] = useState();
  const [question, setQuestion] = useState();
  const [correctAnswer, setCorrectAnswer] = useState();
  const [propsSelected, setPropsSelected] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  const fetchQuestionLists = () => {
    axios
      .get(url + "questionlistsreturndefault")
      .then((response) => {
        setQuestionLists(response.data.questionLists);
        setLoading(false);
      })
      .catch((error) => {
        setErrorMsg(error);
        setLoading(false);
      });
  };

  const fetchCorrectAnswer = (questionId) => {
    axios
      .get(url + "multicorrectanswerbyquestionid/" + questionId)
      .then((response) => {
        setCorrectAnswer(response.data);
      })
      .catch((error) => {
        setErrorMsg(error);
      });
  };

  useEffect(() => {
    fetchQuestionLists();
  }, []);
  return (
    <div>
      {loading ? (
        <div>LOADING ...</div>
      ) : (
        <div>
          <QuestionListTable
            questionLists={questionLists}
            setQuestionList={setQuestionList}
            setPropsSelected={setPropsSelected}
          />
          {questionList && <QuestionListDetails questionList={questionList} />}
          {questionList && (
            <QuestionsTable
              questionList={questionList}
              setQuestion={setQuestion}
              setCorrectAnswer={setCorrectAnswer}
              fetchCorrectAnswer={fetchCorrectAnswer}
              propsSelected={propsSelected}
            />
          )}
          {question && correctAnswer && (
            <QuestionPresentation
              question={question}
              correctAnswer={correctAnswer}
            />
          )}
        </div>
      )}
    </div>
  );
}

export default App;
