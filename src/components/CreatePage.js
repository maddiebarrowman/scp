import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function CreatePage({ addSCP }) {
  const [scp, setScp] = useState({
    id: '',
    item: '',
    class: '',
    containment: '',
    description: '',
    image: null,
  });

  const navigate = useNavigate();

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
    addSCP(scp);
    navigate('/');
  };

  return (
    <div className="create-page">
      <h2>Create New SCP</h2>
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
        <button type="submit">Create</button>
      </form>
    </div>
  );
}

export default CreatePage;
