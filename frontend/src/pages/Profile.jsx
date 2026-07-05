import { useState, useEffect } from "react";
import "./Profile.css";
import { Link, useNavigate } from "react-router-dom";

const API_URL = "http://localhost:8000/api";

function Profile() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/profile`);
      const data = await response.json();
      setProfile(data);
      setError("");
    } catch (err) {
      console.error("Error fetching profile:", err);
      setError("Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    alert("Logged out successfully!");
    navigate("/login");
  };

  if (loading) return <div className="profile-page"><p>Loading...</p></div>;

  return (
    <div className="profile-page">
      <div className="profile-card">
        <h1>My Profile</h1>
        <p>Manage your ElectroMart account</p>

        {error && <p className="error-message">{error}</p>}

        <div className="profile-info">
          <div className="info-box">
            <span>Full Name</span>
            <h3>{profile?.name || "N/A"}</h3>
          </div>

          <div className="info-box">
            <span>Email</span>
            <h3>{profile?.email || "N/A"}</h3>
          </div>

          <div className="info-box">
            <span>Phone</span>
            <h3>{profile?.phone || "N/A"}</h3>
          </div>
        </div>

        <div className="profile-actions">
          <Link to="/cart">
            <button>My Cart</button>
          </Link>

          <Link to="/products">
            <button>Continue Shopping</button>
          </Link>

          <Link to="/edit-profile">
            <button>Edit Profile</button>
          </Link>

          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;