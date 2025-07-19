import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/axiosConfig.js';

export default function EditQualification() {
  const { id } = useParams();
  const [degree, setDegree] = useState('');
  const [institution, setInstitution] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    api.get(`/qualifications/${id}`)
      .then(res => {
        setDegree(res.data.degree);
        setInstitution(res.data.institution);
        setStartDate(res.data.startDate.split('T')[0]);
        setEndDate(res.data.endDate ? res.data.endDate.split('T')[0] : '');
      })
      .catch(err => console.error(err));
  }, [id]);

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await api.put(`/qualifications/${id}`, {
        degree, institution, startDate, endDate
      });
      navigate('/qualifications');
    } catch {
      alert('Update failed');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth:400, margin:'2rem auto' }}>
      <h2>Edit Qualification</h2>
      <div>
        <label>Degree/Title</label>
        <input
          value={degree}
          onChange={e => setDegree(e.target.value)}
          required
          style={{ width:'100%', padding:'.5rem' }}
        />
      </div>
      <div>
        <label>Institution</label>
        <input
          value={institution}
          onChange={e => setInstitution(e.target.value)}
          required
          style={{ width:'100%', padding:'.5rem' }}
        />
      </div>
      <div>
        <label>Start Date</label>
        <input
          type="date"
          value={startDate}
          onChange={e => setStartDate(e.target.value)}
          required
          style={{ width:'100%', padding:'.5rem' }}
        />
      </div>
      <div>
        <label>End Date (leave blank if Present)</label>
        <input
          type="date"
          value={endDate}
          onChange={e => setEndDate(e.target.value)}
          style={{ width:'100%', padding:'.5rem' }}
        />
      </div>
      <button type="submit" style={{ marginTop:'1rem', padding:'.75rem 1.5rem' }}>
        Save
      </button>
    </form>
  );
}
