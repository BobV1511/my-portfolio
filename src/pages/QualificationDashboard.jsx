// src/pages/QualificationDashboard.jsx
import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axiosConfig.js';
import { AuthContext } from '../context/AuthContext.jsx';

export default function QualificationDashboard() {
  const [items, setItems] = useState([]);
  const [error, setError] = useState('');
  const { user } = useContext(AuthContext);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await api.get('/qualifications');
        if (Array.isArray(res.data)) {
          setItems(res.data);
        } else {
          throw new Error('Unexpected response');
        }
      } catch (err) {
        console.error('Failed to load qualifications:', err);
        setError('Could not load education data.');
      }
    }
    fetchData();
  }, []);

  const handleDelete = async id => {
    if (!window.confirm('Are you sure you want to delete this item?')) return;
    try {
      await api.delete(`/qualifications/${id}`);
      setItems(prev => prev.filter(q => q._id !== id));
    } catch (err) {
      console.error('Delete failed:', err);
      alert('Delete failed');
    }
  };

  return (
    <div style={{ maxWidth: 800, margin: '2rem auto' }}>
      <h2>Education Dashboard</h2>

      <div style={{ marginBottom: '1rem' }}>
        <Link to="/">
          <button>← Back to Home</button>
        </Link>{' '}
        {user?.role === 'admin' && (
          <Link to="/qualifications/new">
            <button style={{ marginLeft: '1rem' }}>＋ Add New Qualification</button>
          </Link>
        )}
      </div>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {!error && items.length === 0 && <p>No qualifications found.</p>}

      {!error && items.length > 0 && (
        <ul style={{ paddingLeft: 0 }}>
          {items.map(q => (
            <li
              key={q._1d}
              style={{
                marginBottom: '1rem',
                listStyle: 'none',
                borderBottom: '1px solid #ccc',
                paddingBottom: '0.5rem'
              }}
            >
              <strong>{q.degree || q.title}</strong> at {q.institution}
              <br />
              <em>
                {new Date(q.startDate).toLocaleDateString()} –{' '}
                {q.endDate
                  ? new Date(q.endDate).toLocaleDateString()
                  : 'Present'}
              </em>

              {}
              {user?.role === 'admin' && (
                <span style={{ marginLeft: '1rem' }}>
                  <Link to={`/qualifications/edit/${q._id}`}>
                    <button>✏️ Edit</button>
                  </Link>{' '}
                  <button onClick={() => handleDelete(q._id)}>🗑️ Delete</button>
                </span>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
