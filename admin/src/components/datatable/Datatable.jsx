import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import axios from "axios";
import { userColumns, hostelColumns, roomColumns } from "../../datatablesource";

const Datatable = () => {
  const location = useLocation();
  const path = location.pathname.split("/")[1]; // Extract main path (users, hostels, rooms)

  // ✅ Fetching data based on the path
  const { data, loading, error } = useFetch(`http://localhost:8800/api/${path}`);
  const [list, setList] = useState([]);

  // ✅ Update state when data is fetched
  useEffect(() => {
    if (Array.isArray(data)) {
      setList(
        data.map((item, index) => ({
          id: item._id || index, // Ensure every row has a unique ID
          ...item,
        }))
      );
    }
  }, [data]);

  // ✅ Get columns dynamically based on path
  const getColumns = () => {
    switch (path) {
      case "users":
        return userColumns;
      case "hostel":
        return hostelColumns;
      case "rooms":
        return roomColumns;
      default:
        return [];
    }
  };

  // ✅ Handle delete action
  const handleDelete = async (id) => {
    try {
      console.log(`Deleting from: http://localhost:8800/api/${path}/${id}`);
  
      await axios.delete(`http://localhost:8800/api/${path}/${id}`, { withCredentials: true });
  
      setList((prevList) => prevList.filter((item) => item.id !== id)); // Ensure deletion updates state properly
      console.log("Deleted successfully!");
    } catch (err) {
      console.error("Error deleting item:", err.response?.data || err.message);
      alert("Error deleting item. Please try again."); // Inform user on error
    }
  };
  

  // ✅ Action column for View & Delete
  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => (
        <div className="cellAction">
          <Link to={`/${path}/${params.row.id}`} style={{ textDecoration: "none" }}>
            <div className="viewButton">View</div>
          </Link>
          <div className="deleteButton" onClick={() => handleDelete(params.row.id)}>
            Delete
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="datatable">
      <div className="datatableTitle">
        {path.charAt(0).toUpperCase() + path.slice(1)} {/* Capitalized title */}
        <Link to={`/${path}/new`} className="link">
          Add New
        </Link>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error fetching data</p>
      ) : list.length === 0 ? ( // ✅ Handle empty data
        <p>No records found</p>
      ) : (
        <DataGrid
          className="datagrid"
          rows={list}
          columns={getColumns().concat(actionColumn)}
          pageSize={9}
          rowsPerPageOptions={[9]}
          checkboxSelection
          getRowId={(row) => row.id} // ✅ Ensures correct ID mapping
        />
      )}
    </div>
  );
};

export default Datatable;
