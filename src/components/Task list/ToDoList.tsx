import { useState, useEffect, SetStateAction } from "react";
import "./toDoList.css";

const ToDoList = () => {
  const colors = ["#dc3445", "#ffc107", "#198754"];

  const [input, setInput] = useState("");
  const [taskList, setTaskList] = useState([]);
  const [selectedList, setSelectedList] = useState([]);

  const handleChange = (e: { target: { value: SetStateAction<string> } }) => {
    setInput(e.target.value);
  };

  const submitTask = () => {
    if (input) {
      let newTask = {
        description: input,
        status: colors[0],
      };
      setTaskList([...taskList, newTask]);
      setInput("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      submitTask();
    }
  };

  const clearAll = () => {
    setTaskList([]);
    setInput("");
  };

  const listSelector = (code) => {
    let sortedList = taskList.filter((task) => task.status === code);
    setSelectedList(sortedList);
  };

  return (
    <div id="wrap" className="bg-light">
      <div id="list-wrap">
        <h2 id="title">To do list</h2>
        <div id="new-task-wrap" className="input-group mb-3">
          <button
            id="submit-button"
            onClick={() => {
              submitTask();
            }}
            className="btn btn-outline-secondary bg-dark"
            type="button"
          >
            <i className="fa-solid fa-plus"></i>
          </button>

          <button
            id="clear-button"
            onClick={() => {
              clearAll();
            }}
            className="btn btn-outline-secondary bg-dark"
            type="button"
          >
            <i className="fa-solid fa-arrows-rotate"></i>
          </button>

          <input
            onChange={handleChange}
            id="input-field"
            value={input}
            type="text"
            className="form-control"
            placeholder=""
            aria-label=""
            aria-describedby="basic-addon1"
          />
        </div>

        <div
          id="button-wrap"
          className="btn-group btn-group-toggle"
          data-toggle="buttons"
        >
          <label className="btn btn-secondary active bg-primary">
            <input
              name="task-group"
              type="radio"
              id="all-tasks-button"
              value="allTasks"
              onClick={() => setSelectedList(taskList)}
            />
            All tasks
          </label>
          <label className="btn btn-secondary bg-danger">
            <input
              name="task-group"
              type="radio"
              id="red-button"
              value="toDo"
              onClick={() => listSelector(colors[0])}
            />
            To do
          </label>
          <label className="btn btn-secondary bg-warning">
            <input
              name="task-group"
              type="radio"
              id="yellow-button"
              value="workInProgress"
              onClick={() => listSelector(colors[1])}
            />{" "}
            In progress
          </label>
          <label className="btn btn-secondary bg-success">
            <input
              name="task-group"
              type="radio"
              id="green-button"
              value="done"
              onClick={() => listSelector(colors[2])}
            />{" "}
            Done
          </label>
        </div>
        <hr />

        <div>
          <ol style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            {selectedList.map((task, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                <li style={{ width: "200px" }}>{task.description}</li>

                <button
                  style={{ background: `${task.status}`, color: "black" }}
                  onClick={() => {
                    const updatedTaskList = [...taskList];
                    let actualIndex = colors.findIndex(
                      (color) => color === task.status
                    );
                    let newIndex = (actualIndex + 1) % colors.length;
                    updatedTaskList[index] = {
                      ...task,
                      status: colors[newIndex],
                    };
                    setTaskList(updatedTaskList);
                  }}
                >
                  <i className="fa-solid fa-spinner"></i>
                </button>
                <button>
                  <i className="fa-solid fa-trash"></i>
                </button>
              </div>
            ))}
          </ol>
        </div>
      </div>
      <div id="footer-wrap">
        {taskList.length === 0 ? (
          <p>No tasks left</p>
        ) : taskList.length === 1 ? (
          <p>1 task left</p>
        ) : (
          <p>{taskList.length} tasks left </p>
        )}
      </div>
    </div>
  );
};

export default ToDoList;
