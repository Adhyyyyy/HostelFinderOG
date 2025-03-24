export const hostelInputs = [
  { id: "name", label: "Hostel Name", type: "text", placeholder: "Enter hostel name", required: true },
  { id: "category", label: "Category", type: "select", options: ["Hostel", "PG"], required: true },
  { id: "genderType", label: "Gender Type", type: "select", options: ["Boys", "Girls"], required: true },
  { id: "distanceFromCollege", label: "Distance from College (m)", type: "number", placeholder: "500", required: true },
  { id: "address", label: "Address", type: "text", placeholder: "Enter full address", required: true },
  { id: "vacancy", label: "Vacancy", type: "number", placeholder: "Number of available beds", required: true },
  { id: "capacity", label: "Capacity", type: "number", placeholder: "Total number of beds", required: true },
  { id: "pricing", label: "Pricing (₹ per month)", type: "number", placeholder: "5000", required: true },
  { id: "contact", label: "Hostel Contact", type: "text", placeholder: "9876543210", required: true },
  
  // ✅ Fixed `owner` fields
  { id: "owner.name", label: "Owner Name", type: "text", placeholder: "John Doe", required: true },
  { id: "owner.contact", label: "Owner Contact", type: "text", placeholder: "9876543210", required: true },
  
  // ✅ Fixed `location` fields
  { id: "location.lat", label: "Latitude", type: "number", placeholder: "Enter latitude", required: true },
  { id: "location.lng", label: "Longitude", type: "number", placeholder: "Enter longitude", required: true },
  
  { id: "amenities", label: "Amenities", type: "text", placeholder: "WiFi, Laundry, Parking" },
  { id: "messAvailable", label: "Mess Available?", type: "checkbox" },
  { id: "rules", label: "Rules", type: "text", placeholder: "No smoking, No loud music" }
];



export const roomInputs = [
  { id: "roomID", label: "Room ID", type: "text", placeholder: "Unique room identifier" },
  { id: "roomNumber", label: "Room Number", type: "text", placeholder: "101" },
  { id: "roomType", label: "Room Type", type: "select", options: ["Single", "Double", "Triple", "Quad", "Five", "Six"] },
  { id: "totalBeds", label: "Total Beds", type: "number", placeholder: "2" },
  { id: "price", label: "Price per Month (₹)", type: "number", placeholder: "5000" }
];

export const userInputs = [
  { id: "name", label: "Full Name", type: "text", placeholder: "John Doe" },
  { id: "email", label: "Email", type: "email", placeholder: "johndoe@gmail.com" },
  { id: "phone", label: "Phone Number", type: "text", placeholder: "9876543210" },
  { id: "password", label: "Password", type: "password" },
  { id: "isAdmin", label: "Admin User", type: "checkbox" }
];
