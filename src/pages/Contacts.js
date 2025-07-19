// src/pages/Contacts.js
import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axiosConfig.js';
import { AuthContext } from '../context/AuthContext.jsx';
import './Contacts.css';

export default function Contacts() {
  const [contacts, setContacts] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    api.get('/api/contacts')
       .then(res => setContacts(res.data))
       .catch(console.error);
  }, []);

  const handleDelete = async id => {
    if (!window.confirm('Delete this contact')) return;
    try {
      await api.delete(`/api/contacts/${id}`);
      setContacts(prev => prev.filter(c => c._id !== id));
    } catch (err) {
      console.error(err);
      alert('Failed Delete');
    }
  };

  return (
    <div className="contacts-container">
      <h2>Contacts</h2>

      {user && (
        <div className="contacts-actions">
          <Link to="/contacts/new">
            <button className="btn-primary">＋ Add New Contact</button>
          </Link>
        </div>
      )}

      {contacts.length === 0 ? (
        <p>No contacts yet.</p>
      ) : (
        <ul className="contact-list">
          {contacts.map(c => (
            <li key={c._id} className="contact-card">
              <strong>{c.name}</strong> – {c.email}<br/>
              {c.phone && <span>📞 {c.phone}</span>}<br/>
              {user?.role === 'admin' && (
                <div className="contact-card-actions">
                  <Link to={`/contacts/edit/${c._id}`}><button>Edit</button></Link>{' '}
                  <button onClick={() => handleDelete(c._id)}>Delete</button>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
);
}
