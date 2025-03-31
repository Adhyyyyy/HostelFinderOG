import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState, useMemo } from "react";
import useFetch from "../../hooks/useFetch";
import axios from "../../axios";
import { userColumns, hostelColumns, roomColumns } from "../../datatablesource";
import BedManagement from "../bedManagement/BedManagement";

const Datatable = ({ columns }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const path = location.pathname.split("/")[1];
  const [list, setList] = useState([]);
  const [selectedHostelId, setSelectedHostelId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const { data, loading, error } = useFetch(`/${path}`);
  const [selectedRoom, setSelectedRoom] = useState(null);

  useEffect(() => {
    if (data) {
      if (path === "hostel") {
        // Add onViewRooms handler to each hostel
        const hostelsWithHandler = data.map(hostel => ({
          ...hostel,
          onViewRooms: (hostelId) => {
            setSelectedHostelId(hostelId);
            navigate(`/rooms?hostelId=${hostelId}`);
          }
        }));
        setList(hostelsWithHandler);
      } else if (path === "rooms") {
        // Add status update handler to all rooms
        const roomsWithHandler = data.map(room => ({
          ...room,
          onUpdateStatus: async (roomId, isAvailable) => {
            try {
              await axios.put(`/rooms/status/${roomId}`, { isAvailable });
              // Update the local state
              setList(prevList => 
                prevList.map(prevRoom => 
                  prevRoom._id === roomId 
                    ? { ...prevRoom, isAvailable, occupiedBeds: isAvailable ? 0 : prevRoom.occupiedBeds } 
                    : prevRoom
                )
              );
            } catch (err) {
              console.error("Error updating room status:", err);
              alert("Failed to update room status");
            }
          }
        }));

        // Filter rooms if hostel is selected
        const filteredRooms = selectedHostelId 
          ? roomsWithHandler.filter(room => room.hostelID === selectedHostelId)
          : roomsWithHandler;

        setList(filteredRooms);
      } else {
        setList(data);
      }
    }
  }, [data, path, selectedHostelId, navigate]);

  // Filter list based on search query
  const filteredList = useMemo(() => {
    if (!searchQuery) return list;

    const query = searchQuery.toLowerCase();
    return list.filter(item => {
      switch (path) {
        case "hostel":
          return item.name.toLowerCase().includes(query);
        case "rooms":
          return item.roomNumber.toLowerCase().includes(query);
        case "users":
          return item.name.toLowerCase().includes(query);
        default:
          return true;
      }
    });
  }, [list, searchQuery, path]);

  const selectedColumns = useMemo(() => {
    switch (path) {
      case "users":
        return userColumns;
      case "hostel":
        return hostelColumns;
      case "rooms":
        return roomColumns;
      default:
        return columns || [];
    }
  }, [path, columns]);

  const handleDelete = async (id, id2 = null) => {
    if (!id) {
      console.error("Invalid ID:", id);
      return;
    }

    try {
      let url = `/${path}/${id}`;
      if (id2 && path === "rooms") {
        url += `/${id2}`;
      }

      await axios.delete(url);
      setList((prevList) => (prevList ? prevList.filter((item) => item._id !== id) : []));
    } catch (err) {
      console.error("Error deleting item:", err);
    }
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 300,
      renderCell: (params) => (
        <div className="cellAction">
          <div
            className="viewButton"
            onClick={() => setSelectedRoom(params.row._id)}
          >
            View Beds
          </div>
          <div
            className="updateButton"
            onClick={() => navigate(`/${path}/update/${params.row._id}`)}
          >
            Update
          </div>
          <div
            className="deleteButton"
            onClick={() => {
              if (path === "rooms") {
                handleDelete(params.row._id, params.row.hostelID);
              } else {
                handleDelete(params.row._id);
              }
            }}
          >
            Delete
          </div>
        </div>
      ),
    },
  ];

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading data.</div>;

  return (
    <div className="datatable">
      <div className="datatableTitle">
        {path}
        <div className="titleActions">
          <div className="searchBox">
            <input
              type="text"
              placeholder={`Search ${path}...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          {path === "rooms" && selectedHostelId ? (
            <>
              <button 
                className="backButton"
                onClick={() => {
                  setSelectedHostelId(null);
                  navigate("/hostel");
                }}
              >
                Back to Hostels
              </button>
              <Link to={`/${path}/new`} className="link">
                Add New Room
              </Link>
            </>
          ) : (
            <Link to={`/${path}/new`} className="link">
              Add New
            </Link>
          )}
        </div>
      </div>

      <DataGrid
        className="datagrid"
        rows={filteredList}
        columns={selectedColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
        getRowId={(row) => row._id}
      />

      {selectedRoom && (
        <div className="modal">
          <div className="modalContent">
            <BedManagement 
              roomId={selectedRoom} 
              onClose={() => setSelectedRoom(null)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Datatable;
