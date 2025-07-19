// src/pages/ContactForm.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axiosConfig.js';

export default function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await api.post('/contacts', { name, email, phone });
      navigate('/contacts');
    } catch {
      alert('Failed to add contacts');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth:400, margin:'2rem auto' }}>
      <h2>New Contact</h2>
      <div>
        <label>Name</label>
        <input value={name} onChange={e=>setName(e.target.value)} required/>
      </div>
      <div>
        <label>Email</label>
        <input type="email" value={email} onChange={e=>setEmail(e.target.value)} required/>
      </div>
      <div>
        <label>Phone</label>
        <input value={phone} onChange={e=>setPhone(e.target.value)}/>
      </div>
      <button type="submit">Create</button>
    </form>
  );
}
