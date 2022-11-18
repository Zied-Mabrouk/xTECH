import React from "react";
import { fetchLogin } from "../../../api";
import "./Login.scss";

const Login = ({ setUser }) => {
  let [login, setLogin] = React.useState({
    username: "",
    password: "",
  });
  const onSubmit = async (e) => {
    e.preventDefault();
    const data = await fetchLogin(login);
    if (!data) return;
    setUser(data);
  };

  return (
    <form className="login" onSubmit={onSubmit}>
      <div>
        <label htmlFor="username">username</label>
        <input
          type="text"
          name="username"
          id="username"
          value={login.username}
          onChange={(e) => setLogin({ ...login, username: e.target.value })}
        />
      </div>
      <div>
        <label htmlFor="password">password</label>
        <input
          type="password"
          name="password"
          id="password"
          value={login.password}
          onChange={(e) => setLogin({ ...login, password: e.target.value })}
        />
      </div>
      <button>Login</button>
    </form>
  );
};

export default Login;
