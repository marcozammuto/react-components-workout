import { useState, useEffect, SetStateAction } from "react";

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
  const [modifiyMode, setModifiyMode] = useState(false);
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
      if (!modifiyMode) {
        setTaskList([...taskList, updatedTaskStructure]);
        setInput("");
        setMessage("List updated");
        setModifiyMode(false);
      } else if (modifiyMode) {
        setInput("");
        setMessage("Task updated");
        setModifiyMode(false);
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
    setModifiyMode(false);
  };

  return (
    <>
      <div
        id="command-wrap"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "10px",
        }}
      >
        <h2>To do list</h2>

        <section id="button-wrap" style={{ display: "flex" }}>
          {/* Input */}
          <input onChange={handleChange} id="input-field" value={input}></input>

          {/* Submit button */}
          <button
            id="submit-button"
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
        </section>

        {/* {Message} */}
        <h3>{message}</h3>
      </div>

      <div
        id="sorted-lists-wrap"
        style={{
          display: "flex",
          gap: "50px",
          border: "3px solid black",
          padding: "50px",
        }}
      >
        <div id="sorted-items-wrap">
          <div id="sorted-list-selector">
            <select
              onClick={() => {
                setMessage("List filtered");
              }}
              name="sortedList"
              id="filteredList"
            >
              <option value="allTasks" disabled={taskList.length === 0}>
                All tasks
              </option>
              <option value="toDo" disabled={notDoneList.length === 0}>
                To do
              </option>
              <option
                value="workInProgress"
                disabled={workInProgressList.length === 0}
              >
                Work in progress
              </option>
              <option value="done" disabled={doneList.length === 0}>
                Done
              </option>
            </select>
          </div>

          <div id="sorted-list-results">
            {showedList === "allTasks" ? (
              <ul>
                {taskList.map((task, index) => (
                  <div
                    style={{
                      textAlign: "center",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "10px",
                    }}
                    key={`${index}div`}
                  >
                    {/* Item */}
                    <li key={`${index}item`}>{task.description}</li>

                    <div
                      style={{ display: "flex", gap: "5px" }}
                      id="item-button-wrap"
                    >
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
                          if (!modifiyMode) {
                            setModifiyMode(true);
                            setTaskToModify(task.description);
                            setInput(task.description);
                            document.getElementById("input-field")?.focus();
                          } else {
                            setModifiyMode(false);
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
                  {notDoneList.map((task) => (
                    <div>
                      <li>{task.description}</li>

                      <div
                        style={{ display: "flex", gap: "5px" }}
                        id="item-button-wrap"
                      >
                        {/* Color button */}
                        <button>
                          <i className="fa-solid fa-bars-progress"></i>
                        </button>

                        {/* modify button */}
                        <button>
                          <i className="fa-solid fa-pen-to-square"></i>
                        </button>

                        {/* delete button */}
                        <button>
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
                  {workInProgressList.map((task) => (
                    <div>
                      <li>{task.description}</li>

                      <div
                        style={{ display: "flex", gap: "5px" }}
                        id="item-button-wrap"
                      >
                        {/* Color button */}
                        <button>
                          <i className="fa-solid fa-bars-progress"></i>
                        </button>

                        {/* modify button */}
                        <button>
                          <i className="fa-solid fa-pen-to-square"></i>
                        </button>

                        {/* delete button */}
                        <button>
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
                  {doneList.map((task) => (
                    <div>
                      <li>{task.description}</li>

                      <div
                        style={{ display: "flex", gap: "5px" }}
                        id="item-button-wrap"
                      >
                        {/* Color button */}
                        <button>
                          <i className="fa-solid fa-bars-progress"></i>
                        </button>

                        {/* modify button */}
                        <button>
                          <i className="fa-solid fa-pen-to-square"></i>
                        </button>

                        {/* delete button */}
                        <button>
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
      </div>
    </>
  );
};

export default ToDoList;

//link CSS
//dio esiste viva Bruxelles
