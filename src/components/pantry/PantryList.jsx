import axios from 'axios';
import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../context/auth.context';

import Welcome from '../Welcome';
import PantryCard from './PantryCard';
import AddPantry from './AddPantry';


const API_URL ="http://localhost:5005/pantry"

function PantryList() {

  const [ pantryArray, setPantryArray ] = useState([]);

  const { user } = useContext(AuthContext);

  const storedToken = localStorage.getItem('authToken');
  
  const getUserPantries = () => {

    axios.get(`${API_URL}/${user._id}`, { headers: { Authorization: `Bearer ${storedToken}`} })
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
      <h1>Pantry List Component...</h1>
      <AddPantry user={user} refreshPantries={getUserPantries}/>
      { pantryArray && pantryArray.map((pantry) => <PantryCard key={pantry._id} {...pantry} refreshPantries={getUserPantries} />)}
    </div>
  )
}

export default PantryList;