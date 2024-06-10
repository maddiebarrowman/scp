
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../App.css';

function SCPDetails({ scps, deleteSCP }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const scp = scps.find(scp => scp.id === id);

  if (!scp) {
    return <div>SCP not found</div>;
  }

  const handleDelete = () => {
    deleteSCP(id);
    navigate('/'); // Redirect to home page after deletion
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
      <button onClick={handleDelete} className="delete-button">Delete SCP</button>
    </div>
  );
}

export default SCPDetails;
