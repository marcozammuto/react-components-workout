import { useState } from "react";

const ToDoList = () => {
  const [taskList, setTaskList] = useState([]);
  const [input, setInput] = useState("");
  const [message, setMessage] = useState("Get started");

  const inputUpdater = (event) => {
    setInput(event.target.value);
  };

  const taskListUpdater = () => {
    if (input !== "") {
      const newTask = {
        task: input,
        state: 0,
      };
      setTaskList([...taskList, newTask]);
      setInput("");
      setMessage("Task added");
    } else {
      setMessage("Error");
    }
  };

  const clearAll = () => {
    setTaskList([]);
    setInput("");
  };

  return (
    <div>
      <div id="header-wrap">
        <h2>To do list</h2>
        <h3>{message}</h3>
        <input
          value={input}
          onChange={inputUpdater}
          placeholder="Add new task!"
          type="text"
        ></input>
        <button onClick={taskListUpdater} className="btn">
          Add task
        </button>
        <button onClick={clearAll} className="btn">
          Clear
        </button>
      </div>
      <div id="list-wrap">
        <ol>
          {taskList.map((task, index) => (
            <li>
              <p>{task}</p>
            </li>
          ))}
        </ol>
      </div>
      <div id="filter-wrap"></div>
    </div>
  );
};

export default ToDoList;
