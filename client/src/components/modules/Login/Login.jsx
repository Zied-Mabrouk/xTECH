import React from "react";
import { fetchLogin, fetchSignUp } from "../../../api";
import "./Login.scss";

const Login = ({ setUser }) => {
  let [account, setAccount] = React.useState({
    username: "",
    password: "",
  });
  let [error, setError] = React.useState("");
  let [displayLogin, setDisplayLogin] = React.useState(true);

  const onSubmitLogin = async (e) => {
    e.preventDefault();
    if (account.username === "" || account.password === "") {
      setError("Please fill in all fields");
      return;
    }
    const data = await fetchLogin(account);
    clearAccount();
    if (!data) {
      setError("Invalid username or password");
      return;
    }
    setUser(data);
  };

  const clearAccount = () => {
    if (!displayLogin)
      setAccount({
        username: "",
        password: "",
      });
    else
      setAccount({
        username: "",
        password: "",
        firstName: "",
        lastName: "",
        role: "",
      });
  };

  const switchForm = () => {
    setError("");
    clearAccount();
    setDisplayLogin(!displayLogin);
  };

  const onSubmitSignUp = async (e) => {
    e.preventDefault();
    if (Object.keys(account).every((key) => account[key] === "")) {
      setError("Please fill in all fields");
      return;
    }
    const data = await fetchSignUp(account);
    clearAccount();
    if (!data) {
      return;
    }
    setUser(data);
  };
  return displayLogin ? (
    <form className="login" onSubmit={onSubmitLogin}>
      <div>
        <label htmlFor="username">username</label>
        <input
          type="text"
          name="username"
          id="username"
          value={account.username}
          onChange={(e) => setAccount({ ...account, username: e.target.value })}
        />
      </div>
      <div>
        <label htmlFor="password">password</label>
        <input
          type="password"
          name="password"
          id="password"
          value={account.password}
          onChange={(e) => setAccount({ ...account, password: e.target.value })}
        />
      </div>
      <button>Login</button>
      <p className="extra" onClick={switchForm}>
        Create an account
      </p>
      {error && (
        <p style={{ color: "red" }} className="error">
         {error}
        </p>
      )}
    </form>
  ) : (
    <form className="login" onSubmit={onSubmitSignUp}>
      <div>
        <label htmlFor="firstName">First Name</label>
        <input
          type="firstName"
          name="firstName"
          id="firstName"
          value={account.firstName}
          onChange={(e) =>
            setAccount({ ...account, firstName: e.target.value })
          }
        />
      </div>
      <div>
        <label htmlFor="lastName">Last Name</label>
        <input
          type="lastName"
          name="lastName"
          id="lastName"
          value={account.lastName}
          onChange={(e) => setAccount({ ...account, lastName: e.target.value })}
        />
      </div>
      <div>
        <label htmlFor="role">Role</label>

        <select
          name="role"
          id="role"
          value={account.role}
          onChange={(e) => setAccount({ ...account, role: e.target.value })}
        >
          <option value="">-- Select a role --</option>
          <option value="student">Student</option>
          <option value="influencer">Influencer</option>
          <option value="normal user">Normal User</option>
        </select>
      </div>
      <div>
        <label htmlFor="username">username</label>
        <input
          type="text"
          name="username"
          id="username"
          value={account.username}
          onChange={(e) => setAccount({ ...account, username: e.target.value })}
        />
      </div>
      <div>
        <label htmlFor="password">password</label>
        <input
          type="password"
          name="password"
          id="password"
          value={account.password}
          onChange={(e) => setAccount({ ...account, password: e.target.value })}
        />
      </div>

      <button>Sign up</button>
      <p className="extra" onClick={switchForm}>
        Already have an account?
      </p>
      {error && (
        <p style={{ color: "red" }} className="error">
          {error}
        </p>
      )}
    </form>
  );
};

export default Login;
