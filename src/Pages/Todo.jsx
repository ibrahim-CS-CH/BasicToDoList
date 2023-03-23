import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { BsToggle2On, BsToggle2Off } from "react-icons/bs";
import axios from "axios";

const Todo = () => {
  const { state } = useLocation();
  const [newTask, setNewtask] = useState("");
  const local = localStorage.getItem("user");
  const user = local && local.split(",");
  const [tasks, setTasks] = useState([]);
  const fetchList = () => {
    axios
      .get("http://localhost:4000/todos", {
        auth: {
          username: user[0],
          password: user[1],
        },
      })
      .then((res) => setTasks(res.data));
  };
  useEffect(() => {
    fetchList();
  }, []);
  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:4000/todos/${id}`, {
        auth: {
          username: user[0],
          password: user[1],
        },
      })
      .then((res) => {
        setTasks(tasks.filter((e) => e.id !== id));
        console.log();
      });
  };
  const handleNewTask = (e) => {
    if (newTask.trim() !== "") {
      axios
        .post(
          "http://localhost:4000/todos",
          { task: newTask },
          {
            auth: {
              username: user[0],
              password: user[1],
            },
          }
        )
        .then((res) => {
          setTasks(() => [...tasks, res.data]);
          setNewtask("");
        })
        .catch(() => console.log("Ooops something wrong!."));
    } else {
      alert("please enter your task");
    }
  };
  const handleLogout = () => {
    localStorage.removeItem("user");
  };
  const Toggle = (props) => {
    const [toggle, setToggle] = useState(props.toggle);
    const handleEdit = (id) => {
      axios
        .put(
          `http://localhost:4000/todos/${id}`,
          { completed: !toggle },
          {
            auth: {
              username: user[0],
              password: user[1],
            },
          }
        )
        .then((res) => {
          setToggle(res.data.completed);
          fetchList();
        });
    };
    return (
      <div
        onClick={() => {
          handleEdit(props.id);
        }}>
        {props.toggle == false ? <BsToggle2Off /> : <BsToggle2On />}
      </div>
    );
  };
  return (
    <div className="App">
      <nav className="header">
        <Link to={"/"} onClick={handleLogout}>
          logout
        </Link>
        {state.map((e) => (
          <div key={e.id} className="header-info">
            <h3>{e.name}</h3>
            <img src={e.avatar} alt={e.name} />
          </div>
        ))}
      </nav>
      <div className="newTask">
        <input
          type="text"
          placeholder="Enter your task"
          value={newTask}
          onChange={(e) => setNewtask(e.target.value)}
        />
        <button onClick={handleNewTask}>add new task</button>
      </div>
      {tasks.map((e) => (
        <div key={e.id} className="tasks">
          <h2>{e.task}</h2>
          <h5>{e.completed == true ? "completed" : "not completed"}</h5>
          <Toggle id={e.id} toggle={e.completed} />
          <button onClick={() => handleDelete(e.id)}>delete task</button>
        </div>
      ))}
    </div>
  );
};

export default Todo;
