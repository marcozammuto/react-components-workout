import { useState } from "react";

const ToDoList = () => {
  const [input, setInput] = useState("");
  const [taskList, setTaskList] = useState([]);
  const [message, setMessage] = useState("Get started");

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const submitTask = () => {
    if (input) {
      setTaskList([...taskList, input]), setInput(""), setMessage("Task added");
    } else {
      setMessage("Error");
    }
  };

  const clearAll = () => {
    setTaskList([]);
    setInput("");
    setMessage("List cleared");
  };

  return (
    <div>
      <h2>To do list</h2>
      <input onChange={handleChange} value={input}></input>
      <button onClick={submitTask}>
        {input ? `Adding ${input}` : `Type something!`}
      </button>
      <button onClick={clearAll}>Clear</button>
      <ol>
        {taskList.map((task, index) => (
          <div>
            <li>{task}</li>
            <button
              onClick={() => {
                let updatedList = taskList.filter((_, idx) => index !== idx);
                setTaskList(updatedList);
              }}
            >
              Delete
            </button>
          </div>
        ))}
      </ol>
      <h3>{message}</h3>
    </div>
  );
};

export default ToDoList;
