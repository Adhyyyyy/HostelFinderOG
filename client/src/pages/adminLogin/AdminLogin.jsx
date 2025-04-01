import { useNavigate } from "react-router-dom";
import "./adminLogin.css";

const AdminLogin = () => {
  const navigate = useNavigate();

  const handleAdminLogin = () => {
    window.location.href = process.env.REACT_APP_ADMIN_URL || "https://your-admin-netlify-url.netlify.app";
  };

  return (
    <div className="adminLogin">
      <div className="adminLoginContainer">
        <h1>Admin Dashboard</h1>
        <p>Please log in to access the admin dashboard</p>
        <button onClick={handleAdminLogin} className="adminLoginButton">
          Go to Admin Login
        </button>
        <button onClick={() => navigate("/")} className="backButton">
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default AdminLogin; 