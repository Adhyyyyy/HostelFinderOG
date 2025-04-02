import "./update.scss";
import { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { userInputs, hostelInputs, roomInputs } from "../../formSource";
import "../../styles/form.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";

const Update = ({ inputs }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname.split("/")[1];
  
  const [files, setFiles] = useState("");
  const [info, setInfo] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await axios.get(`/${path}/${id}`);
        setInfo(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching data:", err);
        alert("Error fetching data");
      }
    };
    fetchItem();
  }, [id, path]);

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    
    // Handle nested location object for hostels
    if (id === "location.lat" || id === "location.lng") {
      const key = id.split(".")[1];
      setInfo(prev => ({
        ...prev,
        location: {
          ...prev.location,
          [key]: Number(value)
        }
      }));
      return;
    }

    // Handle numeric fields
    if (["vacancy", "capacity", "distanceFromCollege", "price"].includes(id)) {
      setInfo(prev => ({
        ...prev,
        [id]: Number(value)
      }));
      return;
    }

    setInfo((prev) => ({
      ...prev,
      [id]: type === "checkbox" ? checked : value,
    }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      let updateData = { ...info };

      // Handle file uploads if there are new files
      if (files.length > 0) {
        const list = await Promise.all(
          Object.values(files).map(async (file) => {
            const data = new FormData();
            data.append("file", file);
            data.append("upload_preset", "upload");
            const uploadRes = await axios.post(
              "https://api.cloudinary.com/v1_1/adhy/image/upload",
              data
            );
            return uploadRes.data.url;
          })
        );
        updateData.photos = list;
      }

      // Handle amenities and rules for hostels
      if (path === "hostel") {
        if (typeof updateData.amenities === 'string') {
          updateData.amenities = updateData.amenities.split('\n').filter(item => item.trim());
        }
        if (typeof updateData.rules === 'string') {
          updateData.rules = updateData.rules.split('\n').filter(item => item.trim());
        }
      }

      const response = await axios.put(`/${path}/${id}`, updateData);
      if (response.status === 200) {
        alert("Updated successfully!");
        navigate(`/${path}`);
      }
    } catch (err) {
      console.error("Update failed:", err);
      alert(err.response?.data?.message || "Update failed");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="form">
          <div className="formContainer">
            <h1>Update {path.charAt(0).toUpperCase() + path.slice(1)}</h1>
            <form onSubmit={handleClick}>
              {/* File Upload for images */}
              {path === "hostel" && (
                <div className="formInput">
                  <label>Images</label>
                  <div className="image-upload-container">
                    <input
                      type="file"
                      multiple
                      onChange={(e) => setFiles(Array.from(e.target.files))}
                      className="image-input"
                    />
                    {files.length > 0 ? (
                      <div className="image-preview">
                        <img
                          src={URL.createObjectURL(files[0])}
                          alt="Preview"
                        />
                      </div>
                    ) : info.photos?.length > 0 && (
                      <div className="image-preview">
                        <img
                          src={info.photos[0]}
                          alt="Current"
                        />
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Regular form inputs */}
              {inputs
                .filter(input => input.id !== 'photos' && input.id !== 'ownerContact')
                .map((input) => (
                  <div className="formInput" key={input.id}>
                    {input.type === "checkbox" ? (
                      <div className="checkbox-container">
                        <input
                          type="checkbox"
                          id={input.id}
                          checked={info[input.id] || false}
                          onChange={handleChange}
                        />
                        <label>{input.label}</label>
                      </div>
                    ) : (
                      <>
                        <label>{input.label}</label>
                        {input.type === "select" ? (
                          <select 
                            id={input.id} 
                            value={info[input.id] || ""}
                            onChange={handleChange}
                            required={input.required}
                          >
                            <option value="">Select {input.label}</option>
                            {input.options.map(option => (
                              <option key={option} value={option}>{option}</option>
                            ))}
                          </select>
                        ) : (
                          <input
                            id={input.id}
                            onChange={handleChange}
                            type={input.type}
                            placeholder={input.placeholder}
                            value={
                              input.id.includes("location.") 
                                ? info.location?.[input.id.split(".")[1]] || ""
                                : info[input.id] || ""
                            }
                            pattern={input.pattern}
                            required={input.required}
                          />
                        )}
                      </>
                    )}
                  </div>
              ))}

              {/* Amenities and Rules textareas for hostels */}
              {path === "hostel" && (
                <>
                  <div className="formInput">
                    <label>Amenities (one per line)</label>
                    <textarea
                      id="amenities"
                      value={Array.isArray(info.amenities) ? info.amenities.join('\n') : info.amenities || ''}
                      onChange={handleChange}
                      placeholder="Enter amenities (one per line)"
                      rows={5}
                    />
                  </div>
                  <div className="formInput">
                    <label>Rules (one per line)</label>
                    <textarea
                      id="rules"
                      value={Array.isArray(info.rules) ? info.rules.join('\n') : info.rules || ''}
                      onChange={handleChange}
                      placeholder="Enter rules (one per line)"
                      rows={5}
                    />
                  </div>
                </>
              )}

              <button type="submit">Update</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Update; 