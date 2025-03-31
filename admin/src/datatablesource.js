export const userColumns = [
  { field: "_id", headerName: "ID", width: 70 },
  {
    field: "name",
    headerName: "Name",
    width: 230,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img className="cellImg" src={params.row.img || "https://i.ibb.co/MBtjqXQ/no-avatar.gif"} alt="avatar" />
          {params.row.name}
        </div>
      );
    },
  },
  {
    field: "email",
    headerName: "Email",
    width: 230,
  },
  {
    field: "phone",
    headerName: "Phone",
    width: 120,
  },
  {
    field: "isAdmin",
    headerName: "Admin",
    width: 100,
    renderCell: (params) => (
      <span className={`status ${params.row.isAdmin ? "admin" : "user"}`}>
        {params.row.isAdmin ? "Admin" : "User"}
      </span>
    ),
  },
];

export const hostelColumns = [
  { field: "_id", headerName: "ID", width: 250 },
  {
    field: "name",
    headerName: "Hostel Name",
    width: 200,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img 
            className="cellImg" 
            src={params.row.photos && params.row.photos[0] || "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"} 
            alt="hostel" 
          />
          {params.row.name}
        </div>
      );
    },
  },
  {
    field: "category",
    headerName: "Category",
    width: 120,
  },
  {
    field: "genderType",
    headerName: "For",
    width: 100,
    renderCell: (params) => (
      <span className={`gender ${params.row.genderType.toLowerCase()}`}>
        {params.row.genderType}
      </span>
    ),
  },
  {
    field: "vacancy",
    headerName: "Vacancy",
    width: 100,
  },
  {
    field: "capacity",
    headerName: "Total Capacity",
    width: 130,
  },
  {
    field: "distanceFromCollege",
    headerName: "Distance (km)",
    width: 130,
  },
  {
    field: "contact",
    headerName: "Contact",
    width: 120,
  },
  {
    field: "ownerName",
    headerName: "Owner Name",
    width: 150,
  },
  {
    field: "pricing",
    headerName: "Pricing (₹)",
    width: 120,
    renderCell: (params) => <strong>₹{params.row.pricing}</strong>,
  },
  {
    field: "viewRooms",
    headerName: "Rooms",
    width: 120,
    renderCell: (params) => (
      <div className="viewRoomsButton" onClick={() => params.row.onViewRooms(params.row._id)}>
        View Rooms
      </div>
    ),
  },
];

export const roomColumns = [
  { field: "_id", headerName: "ID", width: 70 },
  {
    field: "roomNumber",
    headerName: "Room Number",
    width: 150,
  },
  {
    field: "hostelID",
    headerName: "Hostel ID",
    width: 250,
  },
  {
    field: "roomType",
    headerName: "Type",
    width: 100,
  },
  {
    field: "totalBeds",
    headerName: "Total Beds",
    width: 120,
  },
  {
    field: "occupiedBeds",
    headerName: "Occupied Beds",
    width: 120,
    renderCell: (params) => (
      <div className="occupiedBeds">
        {params.row.occupiedBeds || 0} / {params.row.totalBeds}
      </div>
    ),
  },
  {
    field: "isAvailable",
    headerName: "Status",
    width: 120,
    renderCell: (params) => (
      <div className={`status ${params.row.isAvailable ? "available" : "occupied"}`}>
        {params.row.isAvailable ? "Available" : "Occupied"}
      </div>
    ),
  },
  {
    field: "price",
    headerName: "Price (₹)",
    width: 130,
    renderCell: (params) => <strong>₹{params.row.price}</strong>,
  },
  {
    field: "updateStatus",
    headerName: "Status",
    width: 150,
    renderCell: (params) => (
      <select 
        className="statusSelect"
        value={params.row.isAvailable ? "available" : "occupied"}
        onChange={(e) => {
          const isAvailable = e.target.value === "available";
          params.row.onUpdateStatus(params.row._id, isAvailable);
        }}
      >
        <option value="available">Available</option>
        <option value="occupied">Occupied</option>
      </select>
    ),
  },
];
