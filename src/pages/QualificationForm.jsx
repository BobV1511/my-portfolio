// src/pages/QualificationForm.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axiosConfig.js';

export default function QualificationForm() {
  const [degree, setDegree] = useState('');
  const [institution, setInstitution] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await api.post('/qualifications', {
        degree,
        institution,
        startDate,
        endDate
      });
      navigate('/qualifications');
    } catch (err) {
      console.error('Failed to add qualification:', err);
      alert('Failed to add new item, please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 400, margin: '2rem auto' }}>
      <h2>New Qualification</h2>
      <div style={{ marginBottom: '1rem' }}>
        <label>Degree</label>
        <input
          type="text"
          placeholder="e.g. B.Sc. Computer Science"
          value={degree}
          onChange={e => setDegree(e.target.value)}
          required
          style={{ width: '100%', padding: '0.5rem' }}
        />
      </div>
      <div style={{ marginBottom: '1rem' }}>
        <label>Institution</label>
        <input
          type="text"
          placeholder="e.g. University of XYZ"
          value={institution}
          onChange={e => setInstitution(e.target.value)}
          required
          style={{ width: '100%', padding: '0.5rem' }}
        />
      </div>
      <div style={{ marginBottom: '1rem' }}>
        <label>Start Date</label>
        <input
          type="date"
          value={startDate}
          onChange={e => setStartDate(e.target.value)}
          required
          style={{ width: '100%', padding: '0.5rem' }}
        />
      </div>
      <div style={{ marginBottom: '1rem' }}>
        <label>End Date (optional)</label>
        <input
          type="date"
          value={endDate}
          onChange={e => setEndDate(e.target.value)}
          style={{ width: '100%', padding: '0.5rem' }}
        />
      </div>
      <button type="submit" style={{ padding: '0.75rem', width: '100%', cursor: 'pointer' }}>
        Add Qualification
      </button>
    </form>
  );
}
