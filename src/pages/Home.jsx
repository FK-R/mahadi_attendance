import React, { useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  if (localStorage.getItem("token") != null) {
    window.location = "/adminPanel";
  }

  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");

  function submit() {
    const data = {
      userId: userId,
      password: password,
    };

    const jsonData = JSON.stringify(data);

    fetch("http://localhost:8080/loginUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: jsonData,
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.message) {
          localStorage.setItem("token", res.token);
          localStorage.setItem("userRole", res.role); // Store the user's role
          window.location = "/adminPanel";
        } else {
          alert(res.alert);
        }
      });
  }
  return (
    <>
      <input
        className="mb"
        type="text"
        onChange={(e) => {
          setUserId(e.target.value);
        }}
      />

      <br />
      <input
        className="mb"
        type="password"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />

      <br />
      <button className="mb" onClick={submit} type="submit">
        Submit
      </button>
      <br />
      <Link to="/register"> Register if you are a new user</Link>
    </>
  );
};

export default Home;
