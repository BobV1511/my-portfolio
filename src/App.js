// src/App.js
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import './App.css';

import Navbar from './components/Navbar.js';

import Home from './pages/Home.js';
import AboutMe from './pages/AboutMe.js';
import Projects from './pages/Projects.js';
import Services from './pages/Services.js';
import ContactMe from './pages/ContactMe.js';
import Contacts from './pages/Contacts.js';


import EditContact from './pages/EditContact.jsx';


import SignInForm from './pages/SignInForm.jsx';
import SignUpForm from './pages/SignUpForm.jsx';

import ProjectForm from './pages/ProjectForm.jsx';
import EditProject from './pages/EditProject.jsx';

import QualificationDashboard from './pages/QualificationDashboard.jsx';
import QualificationForm from './pages/QualificationForm.jsx';
import EditQualification from './pages/EditQualification.jsx';

import ContactForm from './pages/ContactForm.jsx';
import AdminDashboard from './pages/AdminDashboard.jsx';

import ProtectedRoute from './components/ProtectedRoute.jsx';

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <div className="app-container">
        <Routes>
          {}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutMe />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<ContactMe />} />
          <Route path="/contacts" element={<ContactMe />} />

          {}
          <Route
            path="/education"
            element={<Navigate to="/qualifications" replace />}
          />

          {}
          <Route path="/signin" element={<SignInForm />} />
          <Route path="/signup" element={<SignUpForm />} />
          <Route path="/qualifications" element={<QualificationDashboard />} />
          <Route path="/qualifications/edit/:id" element={<EditQualification />} />
          {}
          <Route element={<ProtectedRoute />}>
            {}
            <Route path="/projects/new" element={<ProjectForm />} />
            <Route path="/projects/edit/:id" element={<EditProject />} />
            <Route element={<ProtectedRoute />}></Route>
            <Route path="/contacts/new" element={<ContactForm />} />
           <Route path="/contacts/edit/:id" element={<EditContact />} />
            {}
            <Route path="/qualifications" element={<QualificationDashboard />} />
            <Route path="/qualifications/new" element={<QualificationForm />} />
            <Route path="/projects/new" element={<ProjectForm />} />
            <Route path="/projects/edit/:id" element={<EditProject />} />

            {}
            <Route path="/contacts/new" element={<ContactForm />} />
          </Route>

          {}
          <Route element={<ProtectedRoute adminOnly />}>
            <Route path="/admin" element={<AdminDashboard />} />
          </Route>

          {}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
