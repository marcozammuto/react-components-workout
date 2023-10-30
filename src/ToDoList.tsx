import { useState } from "react";

const ToDoList = () => {
  const [taskList, setTaskList] = useState(["a", "b"]);
  const [input, setInput] = useState("");
  const [message, setMessage] = useState("Get started");

  const inputUpdater = (e) => {
    setInput(e.target.value);
  };

  const taskListUpdater = () => {
    if (input !== "") {
      setTaskList([...taskList, input]);
      setInput("");
      setMessage("Task added");
    } else {
      setMessage("Error");
    }
  };

  const clear = () => {
    setTaskList([]);
    setInput("");
  };

  return (
    <div>
      <div id="header-wrap">
        <h2>To do list</h2>
        <h3>{message}</h3>

        <input
          onChange={inputUpdater}
          placeholder="Add new task!"
          type="text"
        ></input>
        <p>{input}</p>
        <button onClick={taskListUpdater} className="btn">
          Add task
        </button>
        <button onClick={clear} className="btn">
          Clear
        </button>
      </div>
      <div id="list-wrap">
        <ol>
          {taskList.map((task) => (
            <li>{task}</li>
          ))}
        </ol>
      </div>
      <div id="filter-wrap"></div>
    </div>
  );
};

export default ToDoList;
