import { useState } from "react";
import axios from "axios";


const BACKEND_API_URL = process.env.REACT_APP_BACKEND_URL;


function AddPantry(props) {

  const { refreshPantries, user } = props;
  const [ pantryName, setPantryName ] = useState('');
  const [ isCreating, setIsCreating ] = useState(false);

  const handleSubmit = (e) => {                       
    e.preventDefault();
    
    const requestBody = { pantryName, pantryOwner: user._id };

    const storedToken = localStorage.getItem('authToken');

    axios
    .post(`${BACKEND_API_URL}/pantry/create`, requestBody, { headers: { Authorization: `Bearer ${storedToken}`} })
    .then((response) => {
      refreshPantries();
      setPantryName('');
      setIsCreating(false);
    })
    .catch((error) => console.log(error));
  }

  return(
    <div className="addpantry">

      {!isCreating && 
        <div className="addpantrybox">
          <div className="d-grid gap-2 col-6 mx-auto">
            <button type="submit" className="btn btn-outline-success" onClick={() => {setIsCreating(!isCreating)}}>Create Pantry</button>
          </div>
        </div>
      }

      {isCreating &&
        <div className="addpantrybox bg-dark"> 
            <div className="card-body">
              <form className="createpantry" onSubmit={handleSubmit}>
                <div className="form-floating mb-3">
                  <input type="text" className="form-control" id="name" placeholder="Enter name" name="name" value={pantryName} onChange={(e) => setPantryName(e.target.value)} />
                  <label htmlFor="name"className="form-label">Pantry Name</label>
                </div>
                <div className="d-grid gap-2 col-6 mx-auto">
                  <button type="submit" className="btn btn-outline-success">Create</button>
                </div>
              </form>
            </div>
        </div>
      }

    </div>  
  )
}

export default AddPantry;