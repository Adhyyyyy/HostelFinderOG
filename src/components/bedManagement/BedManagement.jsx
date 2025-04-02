import { useState, useEffect } from "react";
import axios from "axios";
import "./bedManagement.scss";

const BedManagement = ({ roomId, onClose }) => {
  const [beds, setBeds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [room, setRoom] = useState(null);

  useEffect(() => {
    fetchBeds();
  }, [roomId]);

  const fetchBeds = async () => {
    try {
      const response = await axios.get(`/api/beds/${roomId}`);
      if (response.data.success) {
        setBeds(response.data.beds);
        setRoom(response.data.room);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching beds:", error);
      setLoading(false);
    }
  };

  const handleBedUpdate = async (bedId, newStatus, occupantName = "", occupantPhone = "") => {
    try {
      await axios.put(`/api/beds/${roomId}/${bedId}`, {
        isOccupied: newStatus,
        occupantName,
        occupantPhone
      });
      fetchBeds(); // Refresh beds after update
    } catch (error) {
      console.error("Error updating bed:", error);
      alert("Failed to update bed status");
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="bedManagement">
      <div className="bedManagementHeader">
        <h2>Bed Management - Room {room?.roomNumber}</h2>
        <button onClick={onClose} className="closeButton">×</button>
      </div>
      <div className="bedsList">
        {beds.map((bed) => (
          <div key={bed._id} className="bedItem">
            <div className="bedHeader">
              <span className="bedNumber">{bed.bedNumber}</span>
              <select
                value={bed.isOccupied}
                onChange={(e) => {
                  const newStatus = e.target.value === "true";
                  if (newStatus) {
                    const name = prompt("Enter occupant name:");
                    const phone = prompt("Enter occupant phone:");
                    if (name && phone) {
                      handleBedUpdate(bed._id, true, name, phone);
                    }
                  } else {
                    handleBedUpdate(bed._id, false);
                  }
                }}
                className={bed.isOccupied ? "occupied" : "vacant"}
              >
                <option value="false">Vacant</option>
                <option value="true">Occupied</option>
              </select>
            </div>
            {bed.isOccupied && (
              <div className="occupantInfo">
                <p><strong>Occupant:</strong> {bed.occupantName}</p>
                <p><strong>Phone:</strong> {bed.occupantPhone}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BedManagement; 