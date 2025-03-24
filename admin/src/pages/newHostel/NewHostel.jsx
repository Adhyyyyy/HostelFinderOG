import "./newHostel.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import axios from "axios";
import { hostelInputs } from "../../formSource";

const NewHostel = () => {
  const [file, setFile] = useState(null);
  const [info, setInfo] = useState({
    location: { lat: "", lng: "" }, // Ensure location object is initialized
    owner: { name: "", contact: "" }, // Ensure owner object is initialized
  });

  // ✅ Handle input changes dynamically, including nested fields
  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;

    setInfo((prev) => {
      // Handle nested fields like `location.lat`, `owner.name`
      if (id.includes(".")) {
        const [parent, child] = id.split(".");
        return {
          ...prev,
          [parent]: {
            ...prev[parent],
            [child]: type === "checkbox" ? checked : value,
          },
        };
      }
      return { ...prev, [id]: type === "checkbox" ? checked : value };
    });
  };

  // ✅ Handle form submission
  const handleClick = async (e) => {
    e.preventDefault();
    try {
      let imageUrl = "";

      // ✅ Retrieve the authentication token (must be an admin token)
      const token = localStorage.getItem("token"); 

      // ✅ If file is selected, upload to Cloudinary
      if (file) {
        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", "upload");

        const uploadRes = await axios.post(
          "https://api.cloudinary.com/v1_1/adhy/image/upload",
          data
        );
        imageUrl = uploadRes.data.secure_url;
      }

      // ✅ Create new hostel object
      const newHostel = {
        ...info,
        image: imageUrl || "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg",
      };

      // ✅ Send request with Authorization header
      await axios.post("http://localhost:8800/api/hostel", newHostel, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Hostel added successfully!");
    } catch (err) {
      console.error("Error uploading hostel:", err);
      alert("Failed to add hostel. Check console for errors.");
    }
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Add New Hostel</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <label htmlFor="file" className="uploadLabel">
              <DriveFolderUploadOutlinedIcon className="icon" />
            </label>
            <input
              type="file"
              id="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files[0])}
              style={{ display: "none" }}
            />
            <img
              src={file ? URL.createObjectURL(file) : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"}
              alt="Preview"
            />
          </div>
          <div className="right">
            <form>
              {hostelInputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  {input.type === "select" ? (
                    <select id={input.id} onChange={handleChange} required>
                      <option value="">Select {input.label}</option>
                      {input.options.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  ) : input.type === "checkbox" ? (
                    <input type="checkbox" id={input.id} onChange={handleChange} />
                  ) : (
                    <input type={input.type} id={input.id} placeholder={input.placeholder} onChange={handleChange} required />
                  )}
                </div>
              ))}
              <button onClick={handleClick}>Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewHostel;
