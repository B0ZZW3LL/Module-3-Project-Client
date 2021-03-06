import axios from 'axios';
import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../context/auth.context';


import Welcome from '../Welcome';
import PantryCard from './PantryCard';
import AddPantry from './AddPantry';


const BACKEND_API_URL = process.env.REACT_APP_BACKEND_URL;


function PantryList() {

  const [ pantryArray, setPantryArray ] = useState([]);

  const { user } = useContext(AuthContext);

  const storedToken = localStorage.getItem('authToken');
  
  const getUserPantries = () => {

    axios.get(`${BACKEND_API_URL}/pantry/${user._id}`, { headers: { Authorization: `Bearer ${storedToken}`} })
    .then((response) => {
      const responseArray = response.data;
      setPantryArray(responseArray);
    })
    .catch((error) => console.log(error));
  };

  useEffect(()=> {
    getUserPantries();
  }, [] );
  
  return ( 
    <div className='pantry-list'>
      <Welcome />
      <AddPantry user={user} refreshPantries={getUserPantries}/>
      <div className="container-fluid">
        <div className="row">
        { pantryArray && pantryArray.map((pantry) => <PantryCard key={pantry._id} {...pantry} refreshPantries={getUserPantries} />)}
        </div>
      </div>
    </div>
  )
}

export default PantryList;