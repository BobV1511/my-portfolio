// src/pages/Projects.js
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import './Projects.css';
import { AuthContext } from '../context/AuthContext.jsx';

export default function Projects() {
  const { user } = useContext(AuthContext);
const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      console.log("Deleting project with id:", id);
    }
  };
  return (
    <div className="projects-container">
      <h2>My Projects</h2>

      {}
      {user && (
        <div style={{ textAlign: 'center', margin: '1rem 0' }}>
          <Link to="/projects/new">
            <button className="btn-primary">＋ Add New Project</button>
          </Link>
        </div>
      )}

      <div className="project-grid">
        <div className="project-card">
          <img src="/assets/project1.png" alt="Project 1" width="200" />
          <h3>Movie Browser App</h3>
          <p>
            A web app that allows users to browse and filter Pixar movies.<br />
            🔹 Users can filter by year, director, or name.<br />
            🔹 Includes file upload for movie posters.
          </p>

           {}
      {user && (
        <div className="project-card-actions">
         <Link to="/projects/edit/1">
        <button className="btn-edit">✏️ Edit</button>
         </Link>
        <button className="btn-delete" onClick={() => handleDelete(1)}>
        🗑️ Delete
      </button>
      </div>
    )}
        </div>

        <div className="project-card">
          <img src="/assets/project2.png" alt="Project 2" width="200" />
          <h3>Pokémon Search App</h3>
          <p>
            A responsive web app using the PokéAPI.<br />
            🔹 View Pokémon by type and abilities.<br />
            🔹 Includes search and detail view.
          </p>

          {}
      {user && (
        <div className="project-card-actions">
         <Link to="/projects/edit/1">
        <button className="btn-edit">✏️ Edit</button>
         </Link>
        <button className="btn-delete" onClick={() => handleDelete(1)}>
        🗑️ Delete
      </button>
      </div>
    )}
        </div>

        <div className="project-card">
          <img src="/assets/project3.png" alt="Project 3" width="200" />
          <h3>Portfolio Website</h3>
          <p>
            This very website you're viewing.<br />
            🔹 Built with React and React Router.<br />
            🔹 Includes resume and contact form.
          </p>

          {}
      {user && (
        <div className="project-card-actions">
         <Link to="/projects/edit/1">
        <button className="btn-edit">✏️ Edit</button>
         </Link>
        <button className="btn-delete" onClick={() => handleDelete(1)}>
        🗑️ Delete
      </button>
      </div>
    )}
        </div>
      </div>
    </div>
  );
}
