import axios from "axios";
import { useState, useEffect } from 'react' 

import ProductSearchCard from "./ProductListCard";

const PRODUCT_API_URL = "http://localhost:8000"

function ProductList() {

  const [ isLoading, setIsLoading ] = useState(true);

  const [ productsArray, setProductsArray ] = useState([]);

  const getProducts = () => {

    axios.get(`${PRODUCT_API_URL}/products`)
    .then((response) => {
      console.log(response)
      const productsReturned = response.data;
      setProductsArray(productsReturned);
    })
    .catch((error) => console.log(error));
  }

  useEffect(() => { 
    getProducts(); 
  }, [] );

  return (
    <div>
      <h1>Product Search Component</h1>
        <div className="container-fluid">
              <div className="row">
                {productsArray && productsArray.map((product) => <ProductSearchCard key={product.barcode_number} {...product} refreshProducts={getProducts} />)}
              </div>
        </div>
    </div>
  )

}

export default ProductList;