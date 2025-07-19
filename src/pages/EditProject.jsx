// src/pages/EditProject.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/axiosConfig.js';

export default function EditProject() {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    async function load() {
      try {
        const res = await api.get(`/projects/${id}`);
        setTitle(res.data.title);
        setDescription(res.data.description);
        setImageUrl(res.data.imageUrl || '');
      } catch (err) {
        console.error(err);
        alert('Failed to load project');
      }
    }
    load();
  }, [id]);

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await api.put(`/projects/${id}`, { title, description, imageUrl });
      navigate('/projects');
    } catch (err) {
      console.error(err);
      alert('Update failed');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 500, margin: '2rem auto' }}>
      <h2>Edit Project</h2>
      <div>
        <label>Title</label>
        <input
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
          style={{ width: '100%', padding: '.5rem' }}
        />
      </div>
      <div>
        <label>Description</label>
        <textarea
          value={description}
          onChange={e => setDescription(e.target.value)}
          required
          style={{ width: '100%', padding: '.5rem' }}
        />
      </div>
      <div>
        <label>Image URL</label>
        <input
          value={imageUrl}
          onChange={e => setImageUrl(e.target.value)}
          style={{ width: '100%', padding: '.5rem' }}
        />
      </div>
      <button type="submit" style={{ marginTop: '1rem', padding: '.75rem 1.5rem' }}>
        Save
      </button>
    </form>
  );
}
