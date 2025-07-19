import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const jwt = JSON.parse(localStorage.getItem("jwt"));
  const token = jwt?.token;
  const user = jwt?.user;

  useEffect(() => {
    if (!token || user.role !== "admin") {
      navigate("/signin");
    } else {
      fetchProjects();
    }
 
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/projects", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProjects(res.data);
    } catch (err) {
      setError("Failed to load projects.");
    }
  };
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure to delete this project?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/projects/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProjects(projects.filter((proj) => proj._id !== id));
    } catch (err) {
      alert("Failed to delete");
    }
  };

  return (
    <div>
      <h2>Admin Dashboard – Project Management</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <button onClick={() => navigate("/admin/project/new")}>
        ➕ Add New Project
      </button>

      <ul>
        {projects.map((proj) => (
          <li key={proj._id} style={{ margin: "10px 0" }}>
            <strong>{proj.title}</strong>: {proj.description}
            <button
              onClick={() => handleDelete(proj._id)}
              style={{ marginLeft: "10px" }}
            >
              🗑️ Delete
            </button>
            <button
              onClick={() => navigate(`/admin/project/edit/${proj._id}`)}
              style={{ marginLeft: "10px" }}
            >
              ✏️ Edit
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
