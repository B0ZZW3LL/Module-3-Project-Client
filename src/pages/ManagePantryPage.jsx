import axios from 'axios';
import { useState, useEffect } from 'react';
// import { Navbar } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

import Navbar from '../components/Navbar';
import ProductCard from '../components/product/ProductCard';


const BACKEND_API_URL = process.env.REACT_APP_BACKEND_URL;


function ManagePantryPage(props) {
  
  const { pantryId } = useParams();

  const [ productsArray, setProductsArray ] = useState([]);
  const [ pantryName, setPantryName ] = useState('');

  const storedToken = localStorage.getItem('authToken');

  const getPantryProducts = () => {

    axios.get(`${BACKEND_API_URL}/pantry/manage/${pantryId}`, { headers: { Authorization: `Bearer ${storedToken}`} })
    .then((response) => {
      const productsReturned = response.data.products;
      const pantryName = response.data.name;
      setProductsArray(productsReturned);
      setPantryName(pantryName);
      console.log(response)
    })
    .catch((error) => console.log(error));
  };

  useEffect(() => { 
    getPantryProducts(); 
  }, [] );

  if (productsArray.length === 0) {
    return(
      <div>
        <Navbar />
        <h2>Pantry {pantryName} does not contain any products....</h2>
      </div>
    )
  } else {
    return(
      <div>
        <Navbar />
        <h1>Managing: {pantryName}</h1>
          <div className="container-fluid">
            <div className="row">
              {productsArray && productsArray.map((product) => <ProductCard key={product._id} {...product} refreshProducts={getPantryProducts} />)}
            </div>
          </div>
      </div>
  )}
}

export default ManagePantryPage;