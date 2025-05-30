import './Projects.css';

function Projects() {
  return (
    <div className="projects-container">
      <h2>My Projects</h2>

      <div className="project-grid">
        <div className="project-card">
          <img src="/assets/project1.png" alt="Project 1" width="200" />
          <h3>Movie Browser App</h3>
          <p>
            A web app that allows users to browse and filter Pixar movies.<br />
            🔹 Users can filter by year, director, or name.<br />
            🔹 Includes file upload for movie posters.
          </p>
        </div>

        <div className="project-card">
          <img src="/assets/project2.png" alt="Project 2" width="200" />
          <h3>Pokémon Search App</h3>
          <p>
            A responsive web app using the PokéAPI.<br />
            🔹 View Pokémon by type and abilities.<br />
            🔹 Includes search and detail view.
          </p>
        </div>

        <div className="project-card">
          <img src="/assets/project3.png" alt="Project 3" width="200" />
          <h3>Portfolio Website</h3>
          <p>
            This very website you're viewing.<br />
            🔹 Built with React and React Router.<br />
            🔹 Includes resume and contact form.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Projects;
