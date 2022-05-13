import axios from "axios"

const API_URL ="http://localhost:5005/pantry"

function PantryCard({ name, _id, refreshPantries }) {

  const deletePantry = (pantryId) => {

    const storedToken = localStorage.getItem('authToken');

    axios.delete(`${API_URL}/delete/${_id}`, { headers: { Authorization: `Bearer ${storedToken}` } })
    .then((response) => {
      console.log(response)
      refreshPantries();
    })
    
    .catch((error) => console.log(error))
  };

  return (
    <div className="card" style={{ width: '18rem' }}>
        <div className="card-body">
          <h5 className="card-title">{name}</h5>
          <button onClick={() => deletePantry(_id)}>Delete</button>
        </div>
    </div>
  )

}

export default PantryCard;