import { useState, useEffect } from "react";
import "./EditProfile.css";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/api";

function EditProfile() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: ""
  });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await fetch(`${API_URL}/profile`);
      
      if (!response.ok) {
        throw new Error("Failed to fetch profile");
      }

      const data = await response.json();
      setFormData({
        name: data.name || "",
        email: data.email || "",
        phone: data.phone || ""
      });
    } catch (err) {
      console.error("Error loading profile:", err);
      setError("Failed to load profile. Please refresh the page.");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error/success messages when user starts editing
    if (error) setError("");
    if (success) setSuccess("");
  };

  const validateForm = () => {
    if (!formData.name || formData.name.trim().length < 2) {
      setError("Name must be at least 2 characters");
      return false;
    }

    if (!formData.email || !formData.email.includes("@")) {
      setError("Please enter a valid email");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setSubmitting(true);
    setError("");
    setSuccess("");

    try {
      const response = await fetch(`${API_URL}/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim()
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update profile");
      }

      const data = await response.json();

      if (data.success) {
        setSuccess("Profile updated successfully!");
        setTimeout(() => navigate("/profile"), 1500);
      } else {
        setError(data.message || "Failed to update profile");
      }
    } catch (err) {
      console.error("Error updating profile:", err);
      setError("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="edit-profile">
        <div className="edit-card">
          <p>Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="edit-profile">
      <div className="edit-card">
        <h2>Edit Profile</h2>

        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Full Name</label>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Phone</label>
            <input
              type="tel"
              name="phone"
              placeholder="Phone"
              value={formData.phone}
              onChange={handleInputChange}
            />
          </div>

          <button type="submit" disabled={submitting}>
            {submitting ? "Saving..." : "Save Changes"}
          </button>
        </form>

        <button 
          className="cancel-btn" 
          onClick={() => navigate("/profile")}
          disabled={submitting}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default EditProfile;