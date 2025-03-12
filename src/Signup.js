import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./css/Signup.css";
import logo from "./asets/j_p.png";
import figure from "./asets/fig.png";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    password: "",
    role: "",
    skills: "",
    resume: null,
  });
  const [errors, setErrors] = useState({});

  // Validation Logic
  const validateForm = () => {
    let newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10}$/;
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const allowedFileTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    // Required field validation
    if (!formData.fullName.trim()) newErrors.fullName = "Full Name is required";
    
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = "Enter a valid 10-digit phone number";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Enter a valid email address";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    } else if (!passwordRegex.test(formData.password)) {
      newErrors.password =
        "Must be 8+ characters, include uppercase, number & special character";
    }

    if (!formData.role.trim()) newErrors.role = "Role is required";
    if (!formData.skills.trim()) newErrors.skills = "Skills are required";

    // Resume file validation
    if (!formData.resume) {
      newErrors.resume = "Resume upload is required";
    } else if (!allowedFileTypes.includes(formData.resume.type)) {
      newErrors.resume = "Invalid file type. Only PDF, DOC, or DOCX allowed";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle file upload
  const handleFileChange = (e) => {
    setFormData({ ...formData, resume: e.target.files[0] });
  };

  // Form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form submitted", formData);
    }
  };

  return (
    <div className="container">
      <nav className="navbar">
        <div className="logo">
          <img src={logo} alt="JobPortal Logo" />
          JobPortal
        </div>
        <div className="nav-links">
          <a href="/">Home</a>
          <a href="/jobs">Job Listings</a>
          <a href="/dashboard">Dashboard</a>
        </div>
        <button className="signup-button" onClick={() => navigate("/")}>
          Login
        </button>
      </nav>

      <div className="signup-container">
        <img src={figure} alt="3D Figure" />
        <div className="signup-box">
          <h2>Job Seeker Sign In</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleChange}
            />
            {errors.fullName && <span className="error-message">{errors.fullName}</span>}

            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
            />
            {errors.phone && <span className="error-message">{errors.phone}</span>}

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <span className="error-message">{errors.email}</span>}

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && <span className="error-message">{errors.password}</span>}

            <input
              type="text"
              name="role"
              placeholder="Select Role"
              value={formData.role}
              onChange={handleChange}
            />
            {errors.role && <span className="error-message">{errors.role}</span>}

            <input
              type="text"
              name="skills"
              placeholder="Skills"
              value={formData.skills}
              onChange={handleChange}
            />
            {errors.skills && <span className="error-message">{errors.skills}</span>}

            <div className="upload-container">
              <input
                type="file"
                id="resume-upload"
                className="upload-input"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
              />
              <label htmlFor="resume-upload" className="upload-btn">
                Upload Resume
              </label>
              {errors.resume && <span className="error-message">{errors.resume}</span>}
            </div>

            <button type="submit" className="signup-btn">
              Sign In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
