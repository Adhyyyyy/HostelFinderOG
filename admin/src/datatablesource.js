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
    field: "price",
    headerName: "Price (₹)",
    width: 130,
    renderCell: (params) => <strong>₹{params.row.price}</strong>,
  },
];
