import { useState } from "react";

const ToDoList = () => {
  const [taskList, setTaskList] = useState(["a", "b"]);

  const taskListUpdater = (e) => {
    setTaskList(...taskList, e.target.value);
  };

  return (
    <div>
      <h2>To do list</h2>
      <input type="text" id="updater"></input>
      <button onClick={taskListUpdater} className="btn">
        Add task
      </button>
      <button className="btn">Clear</button>
      <p>{}</p>
      <ol>
        {taskList.map((task) => (
          <li>{task}</li>
        ))}
      </ol>
    </div>
  );
};

export default ToDoList;
