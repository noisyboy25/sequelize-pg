import React, { FormEvent, useState } from "react";
import "./UserForm.css";

export const UserForm = () => {
  const [name, setName] = useState("");
  const [favoriteColor, setFavoriteColor] = useState("");
  const [age, setAge] = useState(0);
  const [cash, setCash] = useState(0);

  const createUser = async (event: FormEvent) => {
    event.preventDefault();
    const user = JSON.stringify({ name, favoriteColor });
    console.log(user);
    const res = await fetch("/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: user,
    });
    const data = await res.json();
    console.log(data);
  };

  return (
    <form className="user-form" onSubmit={createUser}>
      <div className="input-group">
        <label htmlFor="name">First Name</label>
        <input
          id="name"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
      </div>
      <div className="input-group">
        <label htmlFor="favoriteColor">Favorite Color</label>
        <input
          id="favoriteColor"
          value={favoriteColor}
          onChange={(event) => setFavoriteColor(event.target.value)}
        />
      </div>
      <div className="input-group">
        <label htmlFor="age">Age</label>
        <input
          disabled
          id="age"
          value={age}
          onChange={(event) => setAge(Number(event.target.value))}
        />
      </div>
      <div className="input-group">
        <label htmlFor="cash">Cash</label>
        <input
          disabled
          id="cash"
          value={cash}
          onChange={(event) => setCash(Number(event.target.value))}
        />
      </div>
      <div className="input-group">
        <button className="submit">Submit</button>
      </div>
    </form>
  );
};
