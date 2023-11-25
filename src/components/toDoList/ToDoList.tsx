import { useState, useEffect, SetStateAction } from "react";
import "./toDoList.css";

const ToDoList = () => {
  const colors = ["#dc3445", "#ffc107", "#198754"];

  const [input, setInput] = useState("");
  const [taskList, setTaskList] = useState([]);
  const [selectedList, setSelectedList] = useState([]);
  const [modifyMode, setModifyMode] = useState(false);
  const [taskToModify, setTaskToModify] = useState("");
  const [message, setMessage] = useState("Get Started!");

  const handleChange = (e: { target: { value: SetStateAction<string> } }) => {
    setInput(e.target.value);
  };

  const submitTask = () => {
    if (input) {
      if (!modifyMode) {
        let newTask = {
          description: input,
          status: colors[0],
        };
        setTaskList([...taskList, newTask]);
        setMessage("Task submitted");
      } else {
        const updatedList = taskList.map((task) => {
          if (task.description === taskToModify) {
            return {
              ...task,
              description: input,
            };
          }
          return task;
        });
        setTaskList(updatedList);
        setModifyMode(false);
        setTaskToModify("");
        setMessage("Task modified");
      }
      setInput("");
    } else {
      setMessage("Error");
    }
  };

  const clearAll = () => {
    setTaskList([]);
    setInput("");
    setMessage("Get started");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      submitTask();
    }
  };

  const listSwitcher = (code) => {
    let sortedList = taskList.filter((task) => task.status === code);
    setSelectedList(sortedList);
  };

  useEffect(() => {
    setSelectedList(taskList);
  }, [taskList]);

  addEventListener("keydown", handleKeyPress);

  const maxWidth = 520;

  return (
    <div id="wrap" className="bg-light">
      <div id="header">
        <h2>React prog #2: To do list</h2>
        <p style={{ textAlign: "right", fontSize: "0.9rem" }}>{message}</p>
      </div>

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

        <label className="btn btn-secondary bg-primary">
          <input
            name="task-group"
            type="radio"
            id="yellow-button"
            value="workInProgress"
            onClick={() => {
              listSwitcher(colors[1]);
              setMessage("List sorted");
              setSelectedList(taskList);
            }}
          />{" "}
          All tasks
        </label>
      </div>

      <div
        id="sorting-buttons-wrap"
        className="btn-group btn-group-toggle"
        data-toggle="buttons"
        style={{ width: maxWidth }}
      >
        <label className="btn btn-secondary bg-danger">
          <input
            name="task-group"
            type="radio"
            id="red-button"
            value="toDo"
            onClick={() => {
              listSwitcher(colors[0]);
              setMessage("List sorted");
            }}
          />{" "}
          To do
        </label>
        <label className="btn btn-secondary bg-warning">
          <input
            name="task-group"
            type="radio"
            id="yellow-button"
            value="workInProgress"
            onClick={() => {
              listSwitcher(colors[1]);
              setMessage("List sorted");
            }}
          />{" "}
          In progress
        </label>
        <label className="btn btn-secondary bg-success">
          <input
            name="task-group"
            type="radio"
            id="green-button"
            value="done"
            onClick={() => {
              listSwitcher(colors[2]);
              setMessage("List sorted");
            }}
          />{" "}
          Done
        </label>
      </div>

      <ol style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {selectedList.map((task, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <li style={{ width: "180px", textAlign: "left" }}>
              {task.description}
            </li>

            <button
              style={{ background: `${task.status}`, color: "black" }}
              onClick={() => {
                setTaskList((prevState) => {
                  const updatedTaskList = [...prevState];
                  let actualIndex = colors.findIndex(
                    (color) => color === task.status
                  );
                  let newIndex = (actualIndex + 1) % colors.length;
                  updatedTaskList[index] = {
                    ...task,
                    status: colors[newIndex],
                  };
                  return updatedTaskList;
                });
              }}
            >
              <i className="fa-solid fa-spinner"></i>
            </button>
            <button
              onClick={() => {
                if (!modifyMode) {
                  setModifyMode(true);
                  setInput(task.description);
                  setTaskToModify(task.description);
                  document.getElementById("input-field")?.focus();
                } else {
                  setModifyMode(false);
                  task.description = input;
                  setInput("");
                  setTaskToModify("");
                  setMessage("List modified");
                }
              }}
            >
              <i className="fa-solid fa-pen-to-square"></i>
            </button>
            <button
              onClick={() => {
                let updatedList = taskList.filter(
                  (item) => item.description !== task.description
                );
                setTaskList(updatedList);
                setMessage("Task deleted");
              }}
            >
              <i className="fa-solid fa-trash"></i>
            </button>
          </div>
        ))}
      </ol>

      <div id="counter-wrap">
        <div>
          <div className="me-auto">Total</div>
          <span className="badge bg-primary rounded-pill">
            {taskList.length}
          </span>
        </div>

        <div>
          <div className="me-auto">To do</div>
          <span className="badge bg-primary rounded-pill">
            {taskList.filter((task) => task.status === colors[0]).length}
          </span>
        </div>
        <div>
          <div className="me-auto">In progress</div>
          <span className="badge bg-primary rounded-pill">
            {taskList.filter((task) => task.status === colors[1]).length}
          </span>
        </div>
        <div>
          <div className="me-auto">Done</div>
          <span className="badge bg-primary rounded-pill">
            {taskList.filter((task) => task.status === colors[2]).length}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ToDoList;
