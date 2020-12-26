import React from "react";
import "./UserList.css";

export const UserList = (props: any) => {
  return (
    <table className="user-list">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Favorite Color</th>
        </tr>
      </thead>
      <tbody>
        {props.users.map((user: any) => (
          <tr>
            <td>{user.id}</td>
            <td>{user.name}</td>
            <td style={{ backgroundColor: user.favoriteColor }}>
              {user.favoriteColor}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
