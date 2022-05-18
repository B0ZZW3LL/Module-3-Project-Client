import axios from "axios";
import { useState, useEffect, useContext } from 'react' 
import { AuthContext } from '../../context/auth.context';

import ProductListCard from "./ProductListCard";

const API_URL ="http://localhost:5005/pantry";
const PRODUCT_API_URL = "http://localhost:8000";


function ProductList() {

  const [ isLoading, setIsLoading ] = useState(true);
  const [ productsArray, setProductsArray ] = useState([]);
  const [ pantryArray, setPantryArray ] = useState([]);

  const { user } = useContext(AuthContext);

  const storedToken = localStorage.getItem('authToken');

  const getProducts = () => {

    axios.get(`${PRODUCT_API_URL}/products`)
    .then((response) => {
      console.log(response)
      const productsReturned = response.data;
      setProductsArray(productsReturned);
      setIsLoading(false);
    })
    .catch((error) => console.log(error));
  }

  const getPantries = () => {

    axios.get(`${API_URL}/${user._id}`, { headers: { Authorization: `Bearer ${storedToken}`} })
    .then((response) => {
      const responseArray = response.data;
      setPantryArray(responseArray);
    })
    .catch((error) => console.log(error));
  };

  useEffect(() => { 
    getProducts();
    getPantries(); 
  }, [] );

  return (
    <div>
      <h1>Product Search Component</h1>
        <div className="container-fluid">
              <div className="row">
                {productsArray && productsArray.map((product) => <ProductListCard key={product.barcode_number} pantry={pantryArray} {...product} refreshProducts={getProducts} />)}
              </div>
        </div>
    </div>
  )

}

export default ProductList;