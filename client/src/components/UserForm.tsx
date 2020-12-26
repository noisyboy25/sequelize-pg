import React, { FormEvent, useState } from "react";
import "./UserForm.css";

export const UserForm = (props: any) => {
  const [name, setName] = useState("");
  const [favoriteColor, setFavoriteColor] = useState("orange");
  const colors = ["red", "orange", "yellow", "green", "blue", "purple", "pink", "lightblue"];

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
    props.updateUsers();
  };

  return (
    <form className="user-form" onSubmit={createUser}>
      <label htmlFor="name">First Name</label>
      <input
        id="name"
        value={name}
        onChange={(event) => setName(event.target.value)}
      />

      <label htmlFor="favorite-color">Favorite Color</label>
      <select
        id="favorite-color"
        value={favoriteColor}
        onChange={(event) => setFavoriteColor(event.target.value)}
        style={{ backgroundColor: favoriteColor }}
      >
        {colors.map((color) => (
          <option value={color} style={{ backgroundColor: color }}>
            {color}
          </option>
        ))}
      </select>

      <button className="submit">Submit</button>
    </form>
  );
};
