import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function EditPage({ scps, updateSCP }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [scp, setScp] = useState(() => scps.find((s) => s.id === id) || {});

  useEffect(() => {
    const currentSCP = scps.find((s) => s.id === id);
    if (currentSCP) {
      setScp(currentSCP);
    }
  }, [id, scps]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setScp((prevScp) => ({
      ...prevScp,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setScp((prevScp) => ({
        ...prevScp,
        image: reader.result,
      }));
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateSCP(scp);
    navigate('/');
  };

  return (
    <div className="edit-page">
      <h2>Edit SCP</h2>
      <form onSubmit={handleSubmit}>
        <label>
          SCP ID:
          <input type="text" name="id" value={scp.id} onChange={handleChange} required />
        </label>
        <label>
          Item:
          <input type="text" name="item" value={scp.item} onChange={handleChange} required />
        </label>
        <label>
          Class:
          <input type="text" name="class" value={scp.class} onChange={handleChange} required />
        </label>
        <label>
          Containment:
          <textarea name="containment" value={scp.containment} onChange={handleChange} required />
        </label>
        <label>
          Description:
          <textarea name="description" value={scp.description} onChange={handleChange} required />
        </label>
        <label>
          Image:
          <input type="file" accept="image/*" onChange={handleFileChange} />
        </label>
        <button type="submit">Update</button>
      </form>
    </div>
  );
}

export default EditPage;
