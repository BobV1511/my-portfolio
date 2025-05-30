import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ContactMe() {
  const [formData, setFormData] = useState({ firstName: "", lastName: "", email: "", message: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    navigate("/");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="firstName" placeholder="First Name" onChange={handleChange} required />
      <input name="lastName" placeholder="Last Name" onChange={handleChange} required />
      <input name="email" placeholder="Email" type="email" onChange={handleChange} required />
      <textarea name="message" placeholder="Your message..." onChange={handleChange} required></textarea>
      <button type="submit">Send Message</button>
    </form>
  );
}

export default ContactMe;
