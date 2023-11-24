import { useState, useEffect, SetStateAction } from "react";
import "./toDoList.css";

const ToDoList = () => {
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
  const [showedList, setShowedList] = useState("allTasks");
  const [modifyMode, setModifyMode] = useState(false);
  const [taskToModify, setTaskToModify] = useState("");

  useEffect(() => {
    sortList();
    const selectedList = document.getElementById("filteredList");
    selectedList?.addEventListener("change", function () {
      let selectedListValue = selectedList.value;
      setShowedList(selectedListValue);
    });
  }, [taskList]);

  const handleChange = (e: { target: { value: SetStateAction<string> } }) => {
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
      if (!modifyMode) {
        setTaskList([...taskList, updatedTaskStructure]);
        setInput("");
        setMessage("List updated");
        setModifyMode(false);
      } else if (modifyMode) {
        setInput("");
        setMessage("Task updated");
        setModifyMode(false);
        setTaskToModify("");
        document.getElementById("modify-button")?.click();
      }
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
  };

  const clearAll = () => {
    setTaskList([]);
    setInput("");
    setMessage("List cleared");
    setNotDoneList([]);
    setWorkInProgressList([]);
    setDoneList([]);
    setModifyMode(false);
  };

  return (
    <>
    <div id="wrap">
      <h2 id="title">To do list</h2>
      <div id="new-task-wrap" className="input-group mb-3">
        <div className="input-group-prepend">
          <button
            id="submit-button"
            onClick={() => {
              submitTask();
            }}
            className="btn btn-outline-secondary"
            type="button"
          >
            <i className="fa-solid fa-plus"></i>
          </button>

          <button
            id="submit-button"
            onClick={() => {
              submitTask();
            }}
            className="btn btn-outline-secondary"
            type="button"
            onClick={clearAll}
          >
            <i className="fa-solid fa-arrows-rotate"></i>
          </button>
        </div>
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
        id="list-wrap"
        className="btn-group btn-group-toggle"
        data-toggle="buttons"
      >
        <section id="switch-wrap">
          <label className="btn btn-secondary active">
            <input
              disabled={taskList.length === 0}
              type="radio"
              name="options"
              id="all-tasks-button"
              value="allTasks"
              onClick={() => setShowedList("allTasks")}
            />
            All tasks
          </label>
          <label className="btn btn-secondary">
            <input
              type="radio"
              name="options"
              id="option2"
              value="toDo"
              disabled={notDoneList.length === 0}
              onClick={() => setShowedList("toDo")}
            />
            To do
          </label>
          <label className="btn btn-secondary">
            <input
              type="radio"
              name="options"
              value="workInProgress"
              disabled={workInProgressList.length === 0}
              onClick={() => setShowedList("workInProgress")}
            />{" "}
            In progress
          </label>
          <label className="btn btn-secondary">
            <input
              type="radio"
              name="options"
              id="option3"
              value="done"
              disabled={doneList.length === 0}
              onClick={() => setShowedList("done")}
            />{" "}
            Done
          </label>
        </section>
      </div>

      <hr style={{ width: "100%" }} />

      <div id="view-wrap">
        {showedList === "allTasks" ? (
          <ul>
            {taskList.map((task, index) => (
              <div key={`${index}div`}>
                {/* Item */}
                <li key={`${index}item`}>{task.description}</li>

                <div id="item-button-wrap">
                  {/* Color button */}
                  <button
                    key={`${index}status-button`}
                    onClick={() => {
                      let currentIndex = improvedStatus.findIndex(
                        (item) => item.colorCode === task.progress.colorCode
                      );
                      let newIndex = (currentIndex + 1) % 3;
                      let updatedTaskList = [...taskList];

                      updatedTaskList[index].progress.colorDescription =
                        improvedStatus[newIndex].colorDescription;

                      updatedTaskList[index].progress.colorCode =
                        improvedStatus[newIndex].colorCode;
                      setTaskList(updatedTaskList);
                      console.log(task);
                    }}
                    style={{
                      background: task.progress.colorCode,
                    }}
                  >
                    <i className="fa-solid fa-bars-progress"></i>
                  </button>

                  {/* modify button */}
                  <button
                    key={`${index}modify-button`}
                    id="modify-button"
                    onClick={() => {
                      if (!modifyMode) {
                        setModifyMode(true);
                        setTaskToModify(task.description);
                        setInput(task.description);
                        document.getElementById("input-field")?.focus();
                      } else {
                        setModifyMode(false);
                        task.description = input;
                        setInput("");
                        setTaskToModify("");
                      }
                    }}
                  >
                    <i className="fa-solid fa-pen-to-square"></i>
                  </button>

                  {/* delete button */}
                  <button
                    key={`${index}delete-button`}
                    onClick={() => {
                      let updatedList = taskList.filter(
                        (_, idx) => index !== idx
                      );
                      setTaskList(updatedList);
                      setInput("");
                    }}
                  >
                    <i className="fa-solid fa-trash"></i>
                  </button>
                </div>

                {/* task ends */}
              </div>
            ))}
          </ul>
        ) : showedList === "toDo" ? (
          <div className="sortedList">
            <ul>
              {notDoneList.map((task, index) => (
                <div>
                  <li>{task.description}</li>

                  <div id="item-button-wrap">
                    {/* Color button */}
                    <button
                      key={`${index}status-button`}
                      onClick={() => {
                        let currentIndex = improvedStatus.findIndex(
                          (item) => item.colorCode === task.progress.colorCode
                        );
                        let newIndex = (currentIndex + 1) % 3;
                        let updatedTaskList = [...taskList];

                        updatedTaskList[index].progress.colorDescription =
                          improvedStatus[newIndex].colorDescription;

                        updatedTaskList[index].progress.colorCode =
                          improvedStatus[newIndex].colorCode;
                        setTaskList(updatedTaskList);
                        console.log(task);
                      }}
                      style={{
                        background: task.progress.colorCode,
                        color: "black",
                      }}
                    >
                      <i className="fa-solid fa-bars-progress"></i>
                    </button>

                    {/* modify button */}
                    <button
                      key={`${index}modify-button`}
                      id="modify-button"
                      onClick={() => {
                        if (!modifyMode) {
                          setModifyMode(true);
                          setTaskToModify(task.description);
                          setInput(task.description);
                          document.getElementById("input-field")?.focus();
                        } else {
                          setModifyMode(false);
                          task.description = input;
                          setInput("");
                          setTaskToModify("");
                        }
                      }}
                    >
                      <i className="fa-solid fa-pen-to-square"></i>
                    </button>

                    {/* delete button */}
                    <button
                      key={`${index}delete-button`}
                      onClick={() => {
                        let updatedList = taskList.filter(
                          (_, idx) => index !== idx
                        );
                        setTaskList(updatedList);
                        setInput("");
                      }}
                    >
                      <i className="fa-solid fa-trash"></i>
                    </button>
                  </div>
                </div>
              ))}
            </ul>
          </div>
        ) : showedList === "workInProgress" ? (
          <div className="sortedList">
            <ul>
              {workInProgressList.map((task, index) => (
                <div>
                  <li>{task.description}</li>

                  <div id="item-button-wrap">
                    {/* Color button */}
                    <button
                      key={`${index}status-button`}
                      onClick={() => {
                        let currentIndex = improvedStatus.findIndex(
                          (item) => item.colorCode === task.progress.colorCode
                        );
                        let newIndex = (currentIndex + 1) % 3;
                        let updatedTaskList = [...taskList];

                        updatedTaskList[index].progress.colorDescription =
                          improvedStatus[newIndex].colorDescription;

                        updatedTaskList[index].progress.colorCode =
                          improvedStatus[newIndex].colorCode;
                        setTaskList(updatedTaskList);
                        console.log(task);
                      }}
                      style={{
                        background: task.progress.colorCode,
                        color: "black",
                      }}
                    >
                      <i className="fa-solid fa-bars-progress"></i>
                    </button>

                    {/* modify button */}
                    <button
                      key={`${index}modify-button`}
                      id="modify-button"
                      onClick={() => {
                        if (!modifyMode) {
                          setModifyMode(true);
                          setTaskToModify(task.description);
                          setInput(task.description);
                          document.getElementById("input-field")?.focus();
                        } else {
                          setModifyMode(false);
                          task.description = input;
                          setInput("");
                          setTaskToModify("");
                        }
                      }}
                    >
                      <i className="fa-solid fa-pen-to-square"></i>
                    </button>

                    {/* delete button */}
                    <button
                      key={`${index}delete-button`}
                      onClick={() => {
                        let updatedList = taskList.filter(
                          (_, idx) => index !== idx
                        );
                        setTaskList(updatedList);
                        setInput("");
                      }}
                    >
                      <i className="fa-solid fa-trash"></i>
                    </button>
                  </div>
                </div>
              ))}
            </ul>
          </div>
        ) : showedList === "done" ? (
          <div className="sortedList">
            <ul>
              {doneList.map((task, index) => (
                <div>
                  <li>{task.description}</li>

                  <div id="item-button-wrap">
                    {/* Color button */}
                    <button
                      key={`${index}status-button`}
                      onClick={() => {
                        let currentIndex = improvedStatus.findIndex(
                          (item) => item.colorCode === task.progress.colorCode
                        );
                        let newIndex = (currentIndex + 1) % 3;
                        let updatedTaskList = [...taskList];

                        updatedTaskList[index].progress.colorDescription =
                          improvedStatus[newIndex].colorDescription;

                        updatedTaskList[index].progress.colorCode =
                          improvedStatus[newIndex].colorCode;
                        setTaskList(updatedTaskList);
                        console.log(task);
                      }}
                      style={{
                        background: task.progress.colorCode,
                        color: "black",
                      }}
                    >
                      <i className="fa-solid fa-bars-progress"></i>
                    </button>

                    {/* modify button */}
                    <button
                      key={`${index}modify-button`}
                      id="modify-button"
                      onClick={() => {
                        if (!modifyMode) {
                          setModifyMode(true);
                          setTaskToModify(task.description);
                          setInput(task.description);
                          document.getElementById("input-field")?.focus();
                        } else {
                          setModifyMode(false);
                          task.description = input;
                          setInput("");
                          setTaskToModify("");
                        }
                      }}
                    >
                      <i className="fa-solid fa-pen-to-square"></i>
                    </button>

                    {/* delete button */}
                    <button
                      key={`${index}delete-button`}
                      onClick={() => {
                        let updatedList = taskList.filter(
                          (_, idx) => index !== idx
                        );
                        setTaskList(updatedList);
                        setInput("");
                      }}
                    >
                      <i className="fa-solid fa-trash"></i>
                    </button>
                  </div>
                </div>
              ))}
            </ul>
          </div>
        ) : null}
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
        <p>Designed and coded by Marco Zammuto</p>
      </div>
      </>
  );
};

export default ToDoList;
