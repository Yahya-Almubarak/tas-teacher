import React from "react";
import TasEnhancedTable from "../TasEnhancedTable";
import QuestionModel from "../../models/QuestionModel";
import { CorrectAnswerModel } from "../../models/CorrectAnswerModel";

function createData(question) {
  const id = question.id;
  const name = question.name;
  const description = question.description;
  const type = question.type;
  const locale = question.local;
  return {
    id: id,
    name: name,
    description: description,
    type: type,
    locale: locale,
  };
}
function QuestionsTable(props) {
  const {
    questionList,
    setQuestion,
    setCorrectAnswer,
    fetchCorrectAnswer,
    propsSelected,
  } = props;
  const headCellsIds = ["name", "description", "type", "locale"];
  const headCellsLabels = ["Name", "Description", "Type", "Locale"];

  const headCells = [
    {
      id: headCellsIds[0],
      numeric: false,
      disablePadding: true,
      label: headCellsLabels[0],
    },
    {
      id: headCellsIds[1],
      numeric: false,
      disablePadding: false,
      label: headCellsLabels[1],
    },
    {
      id: headCellsIds[2],
      numeric: false,
      disablePadding: false,
      label: headCellsLabels[2],
    },
    {
      id: headCellsIds[3],
      numeric: false,
      disablePadding: false,
      label: headCellsLabels[3],
    },
  ];

  const tableTitle = "Questions";

  const rows = questionList.questions.map((question) => createData(question));

  const onRowSelected = (id) => {
    const question = questionList.questions.find((q) => q.id == id);
    setQuestion(question);
    fetchCorrectAnswer(id);
  };

  const onRowDeselected = () => {
    setQuestion();
  };

  const onAddQuestion = () => {
    setQuestion(QuestionModel);
    setCorrectAnswer(CorrectAnswerModel);
  };

  React.useEffect(() => {
    setQuestion();
  }, [propsSelected]);
  return (
    <div>
      <TasEnhancedTable
        headCells={headCells}
        tableTitle={tableTitle}
        rows={rows}
        onRowSelected={onRowSelected}
        onRowDeselected={onRowDeselected}
        onNew={onAddQuestion}
        propsSelected={propsSelected}
      />
    </div>
  );
}

export default QuestionsTable;
