import { useEffect, useState } from "react";

import "./App.css";

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/users")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const user = { name, email };

    fetch("http://localhost:3000/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        const newUsers = [...users, data];
        setUsers(newUsers);
        form.reset();
      });
  };
  return (
    <>
      <h1>User Management System</h1>
      <div className="card">
        <h1>user : {users.length}</h1>
        <div>
          <form onSubmit={handleSubmit}>
            <input type="text" name="name" id="" />
            <br />
            <input type="email" name="email" id="" />
            <br />
            <input type="submit" value="Add" />
          </form>
          {users?.map((user) => (
            <p key={user.id}>
              {user.id}. {user.name} : {user.email}
            </p>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
