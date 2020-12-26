import React, { useEffect, useState } from "react";
import "./App.css";
import { UserForm } from "./UserForm";
import { UserList } from "./UserList";

function App() {
  const [loaded, setLoaded] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    updateUsers();
  }, []);

  const updateUsers = async () => {
    setLoaded(false);
    const res = await fetch("/users");
    const data = await res.json();
    setUsers(data);
    setLoaded(true);
  };

  return (
    <div className="App">
      <div className="container">
        <UserForm updateUsers={updateUsers} />
        {loaded && <UserList users={users} />}
      </div>
    </div>
  );
}

export default App;
