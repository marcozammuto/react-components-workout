import { useState, useEffect } from "react";

const ToDoList = () => {
  const status = ["#ff0000", "#ffff00", "#00ff00"];

  const improvedStatus = [
    { colorDescription: "To do", colorCode: "#ff0000" },
    { colorDescription: "Doing", colorCode: "#ffff00" },
    { colorDescription: "Done", colorCode: "#00ff00" },
  ];

  const [input, setInput] = useState("");
  const [message, setMessage] = useState("Get started");
  const [taskList, setTaskList] = useState([]);
  const [notDoneList, setNotDoneList] = useState([]);
  const [workInProgressList, setWorkInProgressList] = useState([]);
  const [doneList, setDoneList] = useState([]);
  const [showedList, setShowedList] = useState("");

  useEffect(() => {
    sortList();
    const selectedList = document.getElementById("filteredList");
    selectedList?.addEventListener("change", function () {
      let selectedListValue = selectedList.value;
      setShowedList(selectedListValue);
      console.log(selectedListValue);
    });
  }, [taskList]);

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const submitTask = () => {
    if (input) {
      let updatedTaskStructure = {
        description: input,
        progress: {
          colorDescription: improvedStatus[0].colorDescription,
          colorCode: improvedStatus[0].colorCode,
        },
      };
      setTaskList([...taskList, updatedTaskStructure]);
      setInput("");
      setMessage("List updated");
    } else {
      setMessage("Error");
    }
  };

  const sortList = () => {
    let sortedListToDo = taskList.filter(
      (task) => task.progress.colorCode === "#ff0000"
    );

    let sortedListInProgress = taskList.filter(
      (task) => task.progress.colorCode === "#ffff00"
    );

    let sortedListDone = taskList.filter(
      (task) => task.progress.colorCode === "#00ff00"
    );

    setNotDoneList(sortedListToDo);
    setDoneList(sortedListDone);
    setWorkInProgressList(sortedListInProgress);
    setMessage("Sorted list");
  };

  const clearAll = () => {
    setTaskList([]);
    setInput("");
    setMessage("List cleared");
    setNotDoneList([]);
    setWorkInProgressList([]);
    setDoneList([]);
    setTimeout("");
    console.clear();
  };

  return (
    <div>
      <h2>To do list</h2>
      {/* Main wrap */}
      <div
        id="command-wrap"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "10px",
        }}
      >
        {/* Input */}
        <input onChange={handleChange} value={input}></input>

        {/* Submit button */}
        <button
          onClick={() => {
            submitTask();
          }}
        >
          <i className="fa-solid fa-plus"></i>
        </button>

        {/* Clear button */}
        <button onClick={clearAll}>
          <i className="fa-solid fa-arrows-rotate"></i>{" "}
        </button>
      </div>
      <h5>{message}</h5>
      <ol>
        {/* Main list */}
        {taskList.map((task, index) => (
          <div
            style={{
              textAlign: "center",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "10px",
            }}
            key={`${index}KeyDiv`}
          >
            {/* Item */}
            <li key={`${index}KeyItem`}>{task.description}</li>

            {/* Color button */}
            <button
              key={`${index}KeyStatusButton`}
              onClick={() => {
                let currentIndex = status.indexOf(task.progress.colorCode);
                let newIndex = (currentIndex + 1) % 3;
                let updatedTaskList = [...taskList];
                updatedTaskList[index].progress.colorCode = status[newIndex];
                setTaskList(updatedTaskList);
              }}
              style={{ background: task.progress.colorCode, color: "black" }}
            ></button>

            {/* delete button */}
            <button
              key={`${index}KeyDeleteButton`}
              onClick={() => {
                let updatedList = taskList.filter((_, idx) => index !== idx);
                setTaskList(updatedList);
              }}
            >
              <i className="fa-solid fa-trash"></i>
            </button>

            {/* task ends */}
          </div>
        ))}
      </ol>

      <div
        id="sorted-lists-wrap"
        style={{
          display: "flex",
          gap: "50px",
          border: "3px solid black",
          padding: "50px",
        }}
      >
        <div className="sortedList">
          <h6>To do:</h6>
          <ol>
            {notDoneList.map((task) => (
              <li>{task.description}</li>
            ))}
          </ol>
        </div>

        <div className="sortedList">
          <h6>Work in progress:</h6>
          <ul>
            {workInProgressList.map((task) => (
              <li>{task.description}</li>
            ))}
          </ul>
        </div>
        <div className="sortedList">
          <h6>Done:</h6>
          <ol>
            {doneList.map((task) => (
              <li>{task.description}</li>
            ))}
          </ol>
        </div>

        <form>
          <select name="sortedList" id="filteredList">
            <option value="filter">Filter</option>
            <option value="toDo">To do</option>
            <option value="workInProgress">Work in progress</option>
            <option value="done">Done</option>
          </select>

          <li>
            {() => {
              switch (showedList) {
                case "toDo":
                  return (
                    <div className="sortedList">
                      <h6>To do:</h6>
                      <ol>
                        {notDoneList.map((task) => (
                          <li>{task.description}</li>
                        ))}
                      </ol>
                    </div>
                  );
                case "workInProgress":
                  return (
                    <div className="sortedList">
                      <h6>Work in progress:</h6>
                      <ol>
                        {workInProgressList.map((task) => (
                          <li>{task.description}</li>
                        ))}
                      </ol>
                    </div>
                  );
                case "done":
                  return (
                    <div className="sortedList">
                      <h6>Done:</h6>
                      <ol>
                        {doneList.map((task) => (
                          <li>{task.description}</li>
                        ))}
                      </ol>
                    </div>
                  );
                default:
                  return <p>Filter</p>;
              }
            }}
          </li>
        </form>
      </div>
    </div>
  );
};

export default ToDoList;
