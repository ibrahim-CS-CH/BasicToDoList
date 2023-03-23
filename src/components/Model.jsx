import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const Model = (props) => {
  const navigate = useNavigate();
  const [passwd, setPasswd] = useState("");
  const sendData = async (username, passwd) => {
    await axios
      .get("http://localhost:4000/todos", {
        auth: {
          username: username,
          password: passwd,
        },
      })
      .then((res) => {
        if(res.status === 200) {
            localStorage.setItem("user",[username,passwd]);
            navigate("/dashboard", {
                state: props.user,
            });
        }
      })
      .catch(() => {
        alert("your password doesn't match please try again");
        setPasswd('')
      });
  };

  const handleLogin = (e) => {
    if (passwd != "") {
      sendData(e.target.id, passwd);
    } else {
      alert("please enter Your password")
    }
  };
  return (
      props.user.map((e) => (
        <div key={e.id} className="model">
          <img src={e.avatar} alt={e.name}/>
          <h2>{e.name}</h2>
         <div className="pass">
          <input
              type="password"
              placeholder="password"
              value={passwd}
              onChange={(e) => setPasswd(e.target.value)}
            />
            <button onClick={handleLogin} id={e.username}>
              login
            </button>
         </div>
        </div>
      ))
  );
};

export default Model;
