import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axiosConfig.js';

function ContactMe() {
  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', message: '' });
  const navigate = useNavigate();

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const name = `${formData.firstName} ${formData.lastName}`;
    try {
      await api.post('/contacts', {
        name,
        email: formData.email,
        phone: '', 
        message: formData.message, 
      });
      alert('Message sent successfully!');
      navigate('/');
    } catch {
      alert('Message failed.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="firstName" placeholder="First Name" onChange={handleChange} required />
      <input name="lastName" placeholder="Last Name" onChange={handleChange} required />
      <input name="email" placeholder="Email" type="email" onChange={handleChange} required />
      <textarea name="message" placeholder="Your message..." onChange={handleChange} required />
      <button type="submit">Send Message</button>
    </form>
  );
}

export default ContactMe;
