import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useState } from "react";
import axios from "axios";

const New = ({ inputs, title }) => {
  const [info, setInfo] = useState({});

  const handleChange = (e) => {
    const { id, type, checked, value } = e.target;
    setInfo((prev) => ({
      ...prev,
      [id]: type === "checkbox" ? checked : value, // Handle checkboxes properly
    }));
  };

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      await axios.post("/auth/register", info);
      alert("User registered successfully!");
    } catch (err) {
      console.error("User registration failed:", err);
    }
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          <div className="right">
            <form>
              {inputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  {input.type === "checkbox" ? (
                    <input type="checkbox" id={input.id} onChange={handleChange} />
                  ) : (
                    <input
                      type={input.type}
                      id={input.id}
                      placeholder={input.placeholder}
                      onChange={handleChange}
                    />
                  )}
                </div>
              ))}
              <button onClick={handleClick}>Register</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default New;
