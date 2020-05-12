import React, { useContext } from "react";
import MaterialTable from "material-table";
import { QuestionContext } from "../../context";
import { InputLabel, Select, MenuItem } from "@material-ui/core";

function QuestionList() {
  const appContext = useContext(QuestionContext);
  const {
    questionList,
    loading,
    questionLists,
    loadingQuestionLists,
    setQuestionList,
    setQuestion,
    setEditQuestion,
  } = appContext;

  const tableDataFromQuestionList = (questionList) => {
    let data = [];
    if (questionList) {
      data = questionList.questions.map((question) => {
        return {
          name: question.name,
          type: question.type,
          locale: question.local,
          question: question,
        };
      });
    } else {
      data = [
        {
          name: "",
          type: "",
          locale: "",
          question: "",
        },
      ];
    }
    return data;
  };

  const data = tableDataFromQuestionList(questionList);

  const [state, setState] = React.useState({
    columns: [
      { title: "Name", field: "name" },
      { title: "Type", field: "type" },
      { title: "Locale", field: "locale" },
    ],
    data: data,
  });

  const handleChange = (event) => {
    setQuestionList(event.target.value);
    setState({
      ...state,
      data: tableDataFromQuestionList(event.target.value),
    });
  };

  return (
    <div>
      {loading ? (
        <div>Loading</div>
      ) : (
        <>
          <InputLabel id="demo-simple-select-label">Question List</InputLabel>
          <>
            {loadingQuestionLists ? (
              <div>LOADING</div>
            ) : (
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                onChange={handleChange}
                value={questionList}
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
          <MaterialTable
            title="Questions"
            columns={state.columns}
            data={state.data}
            actions={[
              {
                icon: "edit",
                tooltip: "Edit Question",
                onClick: (event, rowData) => {
                  setQuestion(rowData.question);
                  setEditQuestion(true);
                },
              },
              {
                icon: "delete",
                tooltip: "Delete Question",
                onClick: (event, rowData) => {},
              },
            ]}
            editable={{
              onRowAdd: (newData) =>
                new Promise((resolve) => {
                  setTimeout(() => {
                    resolve();
                    setState((prevState) => {
                      const data = [...prevState.data];
                      data.push(newData);
                      return { ...prevState, data };
                    });
                  }, 600);
                }),
            }}
          />
        </>
      )}
      }
    </div>
  );
}

export default QuestionList;
