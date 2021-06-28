import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./todo.css";

function Todo() {
  const [task, setTask] = useState("");
  const [todoList, setTodoList] = useState([]);
  const undone = "Mark as not done";
  const done = "Mark as done";

  const handleChange = (e) => {
    e.preventDefault();
    setTask(e.target.value);
  };

  const addTask = () => {
    if (task === "") {
      alert("Task Cannot be empty");
      return;
    }
    const newTodoList = {
      id: Math.floor(Math.random() * 1000),
      value: task,
      completed: false,
    };
    setTodoList([...todoList, newTodoList]);
    console.log(todoList);
  };

  const deleteTask = (currentTask) => {
    console.log(currentTask);
    // currentTask.preventDefault();
    setTodoList(todoList.filter((element) => element.id !== currentTask.id));
  };

  const changeStatus = (currentTask) => {
    const currentTaskID = todoList.findIndex(
      (element) => element.id === currentTask.id
    );
    const newTodoList = [...todoList];
    newTodoList[currentTaskID] = {
      ...newTodoList[currentTaskID],
      completed: currentTask.completed ? false : true,
    };
    setTodoList(newTodoList);
    console.log(currentTask);
  };

  return (
    <>
      <p className="heading">ToDO Manager</p>
      <input
        type="text"
        className="task-input w-5 p-3 m-2"
        placeholder="add a task......"
        onChange={(e) => {
          handleChange(e);
        }}
      />
      <button
        className="btn btn-warning mb-2 ml-2"
        onClick={(e) => {
          addTask(e);
        }}
      >
        Add Task
      </button>
      <div className="container">
        {todoList.map((element, id) => {
          return (
            <div className="tile" key={id}>
              <div
                className={
                  element.completed
                    ? "completed-task mt-2"
                    : "incomplete-task mt-2"
                }
              >
                {element.value}
              </div>
              <span>
                <button
                  className={
                    element.completed
                      ? "btn btn-warning m-3"
                      : "btn btn-success m-3"
                  }
                  onClick={() => changeStatus(element)}
                >
                  {element.completed ? undone : done}
                </button>
                <button
                  className="btn btn-danger m-3"
                  onClick={() => {
                    deleteTask(element);
                  }}
                >
                  Delete
                </button>
              </span>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Todo;
