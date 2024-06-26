import React, { useState, useEffect } from 'react';
import { NavLink, Route, Routes } from 'react-router-dom';
import MyClass from './components/MyClass';
import SCPDetails from './components/SCPDetails';
import CreatePage from './components/CreatePage';
import EditPage from './components/EditPage';
import './App.css';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc, getDoc, setDoc, getDocs, updateDoc, deleteDoc } from 'firebase/firestore';

function App() {
  const firebaseConfig = {
    apiKey: "AIzaSyAGJR9etYS-KPwLaR7GAGcpN5bqxOyuMSg",
    authDomain: "test-903e0.firebaseapp.com",
    projectId: "test-903e0",
    storageBucket: "test-903e0.appspot.com",
    messagingSenderId: "173694762913",
    appId: "1:173694762913:web:0cd23e5a198f8e77e695e0"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  const [scps, setScps] = useState([]);

  const readScps = async () => {
    const storedScps = [];
    const querySnapshot = await getDocs(collection(db, 'scps'));
    querySnapshot.forEach((doc) => {
      storedScps.push({ id: doc.id, ...doc.data() });
    });
    return storedScps.length ? storedScps : [
      { id: 'SCP-002', item: 'SCP-002', class: 'Euclid', containment: 'Containment procedures...', description: 'Description of SCP-002', image: null },
      { id: 'SCP-003', item: 'SCP-003', class: 'Euclid', containment: 'Containment procedures...', description: 'Description of SCP-003', image: null },
      { id: 'SCP-004', item: 'SCP-004', class: 'Euclid', containment: 'Containment procedures...', description: 'Description of SCP-004', image: null },
      { id: 'SCP-005', item: 'SCP-005', class: 'Safe', containment: 'Containment procedures...', description: 'Description of SCP-005', image: null },
    ];
  };

  useEffect(() => {
    const fetchData = async () => {
      const scpsData = await readScps();
      setScps(scpsData);
    };
    fetchData();
  }, []);

  const addSCP = async (newScp) => {
    await setDoc(doc(db, 'scps', newScp.id), newScp);
    const scpsData = await readScps();
    setScps(scpsData);
  };

  const updateSCP = async (updatedScp) => {
    const scpRef = doc(db, 'scps', updatedScp.id);
    const docSnapshot = await getDoc(scpRef);

    if (docSnapshot.exists()) {
      await updateDoc(scpRef, updatedScp);
    } else {
      await setDoc(scpRef, updatedScp); // This will create the document if it does not exist
    }

    const scpsData = await readScps();
    setScps(scpsData);
  };

  const deleteSCP = async (id) => {
    await deleteDoc(doc(db, 'scps', id));
    const scpsData = await readScps();
    setScps(scpsData);
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

export default App;
