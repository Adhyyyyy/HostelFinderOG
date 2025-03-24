import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./login.scss";

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const { loading, error, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });

    try {
      const res = await axios.post("http://localhost:8800/api/auth/login", credentials, {
        withCredentials: true, // Ensures cookies work (if needed)
      });

      console.log("Login Response:", res.data); // Debug API response

      if (res.data?.user?.isAdmin) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));

        dispatch({ type: "LOGIN_SUCCESS", payload: res.data.user });

        navigate("/", { replace: true }); // Redirect
        window.location.reload(); // Ensure state updates
      } else {
        dispatch({ type: "LOGIN_FAILURE", payload: { message: "You are not allowed!" } });
      }
    } catch (err) {
      console.error("Login Error:", err);
      dispatch({
        type: "LOGIN_FAILURE",
        payload: err.response?.data || { message: "Login failed!" },
      });
    }
  };

  return (
    <div className="login">
      <div className="lContainer">
        <input
          type="email"
          placeholder="Email"
          id="email"
          onChange={handleChange}
          className="lInput"
          required
        />
        <input
          type="password"
          placeholder="Password"
          id="password"
          onChange={handleChange}
          className="lInput"
          required
        />
        <button disabled={loading} onClick={handleClick} className="lButton">
          {loading ? "Logging in..." : "Login"}
        </button>
        {error && <span className="error">{error.message}</span>}
      </div>
    </div>
  );
};

export default Login;
