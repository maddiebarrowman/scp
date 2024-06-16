import React, { useState, useEffect } from 'react';
import { NavLink, Route, Routes } from 'react-router-dom';
import MyClass from './components/MyClass';
import SCPDetails from './components/SCPDetails';
import CreatePage from './components/CreatePage';
import EditPage from './components/EditPage';
import './App.css';

function App() {
  const [scps, setScps] = useState(() => {
    const storedScps = JSON.parse(localStorage.getItem('scps'));
    return storedScps || [
      { id: 'SCP-002', item: 'SCP-002', class: 'Euclid', containment: 'Containment procedures...', description: 'Description of SCP-002', image: null },
      { id: 'SCP-003', item: 'SCP-003', class: 'Euclid', containment: 'Containment procedures...', description: 'Description of SCP-003', image: null },
      { id: 'SCP-004', item: 'SCP-004', class: 'Euclid', containment: 'Containment procedures...', description: 'Description of SCP-004', image: null },
      { id: 'SCP-005', item: 'SCP-005', class: 'Safe', containment: 'Containment procedures...', description: 'Description of SCP-005', image: null },
    ];
  });

  useEffect(() => {
    localStorage.setItem('scps', JSON.stringify(scps));
  }, [scps]);

  const addSCP = (newScp) => {
    setScps([...scps, newScp]);
  };

  const updateSCP = (updatedScp) => {
    const updatedScps = scps.map(scp => (scp.id === updatedScp.id ? updatedScp : scp));
    setScps(updatedScps);
  };

  const deleteSCP = (id) => {
    const updatedScps = scps.filter(scp => scp.id !== id);
    setScps(updatedScps);
  };

  return (
    <div className="app-container">
      <nav className="navbar top-navbar">
        <NavLink className="navbar-link" to="/">Home</NavLink>
        <NavLink className="navbar-link" to="/create">Create</NavLink>
      </nav>
      <div className="main-content">
        <nav className="navbar side-navbar">
          {scps.map(scp => (
            <NavLink key={scp.id} className="navbar-link" to={`/scp/${scp.id}`}>{scp.item}</NavLink>
          ))}
        </nav>
        <div className="container">
          <MyClass />
          <Routes>
            <Route path="/scp/:id" element={<SCPDetails scps={scps} deleteSCP={deleteSCP} />} />
            <Route path="/create" element={<CreatePage addSCP={addSCP} />} />
            <Route path="/edit/:id" element={<EditPage scps={scps} updateSCP={updateSCP} />} />
            <Route path="/" element={<div>Select an SCP or create a new one.</div>} />
          </Routes>
        </div>
      </div>
      <footer className="footer"></footer>
    </div>
  );
}

