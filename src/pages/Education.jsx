// src/pages/Education.jsx
import React, { useEffect, useState } from 'react';
import api from '../api/axiosConfig.js';

export default function Education() {
  const [items, setItems] = useState([]);

  useEffect(() => {

    async function fetchData() {
      try {
        const res = await api.get('/qualifications');
        setItems(res.data);
      } catch (err) {
        console.error('Failed to load education:', err);
      }
    }
    fetchData();
  }, []);

  return (
    <div style={{ maxWidth: 800, margin: '2rem auto' }}>
      <h2>Education</h2>
      {items.length === 0 ? (
        <p>No education entries yet.</p>
      ) : (
        <ul>
          {items.map((q) => (
            <li key={q._id}>
              <strong>{q.degree || q.title}</strong> — {q.institution}<br/>
              <em>
                {new Date(q.startDate).toLocaleDateString()} 
                {' '}–{' '}
                {q.endDate ? new Date(q.endDate).toLocaleDateString() : 'Present'}
              </em>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
