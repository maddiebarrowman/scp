import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../App.css'; // Corrected import path

function SCPDetails({ scps, deleteSCP }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const scp = scps.find(scp => scp.id === id);

  if (!scp) {
    return <div>SCP not found</div>;
  }

  const handleDelete = () => {
    deleteSCP(id);
    navigate('/');
  };

  const handleEdit = () => {
    navigate(`/edit/${id}`);
  };

  return (
    <div className="scp-container">
      <h2>{scp.item}</h2>
      <div className="image-row">
        {scp.image && <img src={scp.image} alt={`scp ${id}`} />}
      </div>
      <p>Object Class: {scp.class}</p>
      <p>Containment: {scp.containment}</p>
      <p>Description: {scp.description}</p>
      <div className="button-row">
        <button onClick={handleEdit} className="edit-button">Edit SCP</button>
        <button onClick={handleDelete} className="delete-button">Delete SCP</button>
      </div>
    </div>
  );
}

export default SCPDetails;
