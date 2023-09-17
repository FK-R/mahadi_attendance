import React, { useState } from "react";

function Registers() {
  const [userId, setUserId] = useState("");
  const [role, setRole] = useState("teacher"); // Default role is teacher
  const [password, setPassword] = useState("");

  function submit() {
    const data = {
      userId: userId,
      role: role,
      password: password,
    };

    const jsonData = JSON.stringify(data);

    fetch("http://localhost:8080/uploadFile", {
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
          window.location.href = "/adminPanel"; // Redirect to the admin panel
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
      <select
        className="mb"
        onChange={(e) => {
          setRole(e.target.value);
        }}
      >
        <option value="teacher">Teacher</option>
        <option value="student">Student</option>
        <option value="admin">Admin</option>
      </select>
      <br />
      <input
        className="mb"
        type="password"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <br />
      <button onClick={submit} type="submit">
        Submit
      </button>
    </>
  );
}

export default Registers;
