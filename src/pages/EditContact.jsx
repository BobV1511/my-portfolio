import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/axiosConfig.js';

export default function EditContact() {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    async function load() {
      try {
        const res = await api.get(`/contacts/${id}`);
        setFormData({
          firstName: res.data.firstName,
          lastName: res.data.lastName,
          email: res.data.email,
          message: res.data.message
        });
      } catch (err) {
        console.error(err);
        alert('Failed to load contact');
      }
    }
    load();
  }, [id]);

  const handleChange = e => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await api.put(`/contacts/${id}`, formData);
      navigate('/contacts');
    } catch (err) {
      console.error(err);
      alert('Update failed');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth:400, margin:'2rem auto' }}>
      <h2>Edit Contact</h2>
      {['firstName','lastName','email','message'].map(field => (
        <div key={field} style={{ marginBottom: '1rem' }}>
          <label style={{ display:'block', marginBottom: '0.25rem' }}>
            {field[0].toUpperCase() + field.slice(1)}
          </label>
          {field !== 'message' ? (
            <input
              name={field}
              type={field === 'email' ? 'email' : 'text'}
              value={formData[field]}
              onChange={handleChange}
              required
              style={{ width:'100%', padding:'.5rem' }}
            />
          ) : (
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              style={{ width:'100%', padding:'.5rem' }}
            />
          )}
        </div>
      ))}
      <button type="submit" style={{ padding:'.75rem 1.5rem' }}>Save Changes</button>
    </form>
  );
}
