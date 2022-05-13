import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import ProductCard from '../components/product/ProductCard';


const API_URL ="http://localhost:5005/pantry"

function ManagePantryPage(props) {
  
  const { pantryId } = useParams();

  const [ productsArray, setProductsArray ] = useState([]);
  const [ pantryName, setPantryName ] = useState('');

  const storedToken = localStorage.getItem('authToken');

  const getPantryProducts = () => {

    axios.get(`${API_URL}/manage/${pantryId}`, { headers: { Authorization: `Bearer ${storedToken}`} })
    .then((response) => {
      const productsReturned = response.data.products;
      const pantryName = response.data.name;
      setProductsArray(productsReturned);
      setPantryName(pantryName);
    })
    .catch((error) => console.log(error));
  };

  useEffect(() => { 
    getPantryProducts(); 
  }, [] );

  if (productsArray.length === 0) {
    return(
      <h2>Pantry {pantryName} does not contain any products....</h2>
    )
  } else {
    return(
      <div>
        <h1>Managing: {pantryName}</h1>
        {productsArray && productsArray.map((product) => <ProductCard key={product._id} {...product} refreshProducts={getPantryProducts} />)}
      </div>
  )}
}

export default ManagePantryPage;