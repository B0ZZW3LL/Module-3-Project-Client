import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";


const API_URL ="http://localhost:5005/pantry";


function PantryCard({ name, _id, refreshPantries }) {

  const storedToken = localStorage.getItem('authToken');

  const [ isEditing, setIsEditing ] = useState(false);
  const [ pantryName, setPantryName ] = useState(name);

  // Handle pantry name change //
  const changePantryName = () => {
    
    const requestBody = { pantryName };

    axios.put(`${API_URL}/edit/${_id}`, requestBody, { headers: { Authorization: `Bearer ${storedToken}` } })
    .then((response) => {
      console.log(response);
      refreshPantries();
      setIsEditing(false);
    })
    .catch((error) => console.log(error));
  }

  // Handle pantry deletion //
  const deletePantry = () => {

    const storedToken = localStorage.getItem('authToken');

    axios.delete(`${API_URL}/delete/${_id}`, { headers: { Authorization: `Bearer ${storedToken}` } })
    .then((response) => {
      console.log(response);
      refreshPantries();
    })
    .catch((error) => console.log(error));
  };

  return (
    <div className="card-dark bg-dark" style={{ maxWidth: '18rem' }}>
        <div className="card-body">
          <h5 className="card-title">{name}</h5>
          <div className="d-grid gap-2 col-8 mx-auto">
          { !isEditing ? (
              <>
                <Link to={`/manage/${_id}`}>
                  <button className="btn btn-outline-success manage">Manage</button>
                </Link>  
                <button className="btn btn-outline-success" onClick={() => {setIsEditing(true)}}>Change Name</button>
                <button className="btn btn-outline-success" onClick={deletePantry}>Delete</button>
              </>
            ) : (
              <>
                <input type="text" className="form-control" placeholder={pantryName} name="name" value={pantryName} onChange={(event) => setPantryName(event.target.value)} />
                <button type="submit" className="btn btn-outline-success" onClick={changePantryName}>Confirm</button>
              </>
            )}
          </div>
        </div>
    </div>
  )

}

export default PantryCard;