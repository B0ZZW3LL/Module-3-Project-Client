import axios from "axios";
import { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";

import ProductDetailCard from "../components/product/ProductDetailCard";


const API_URL = "http://localhost:5005/product";


function ProductDetailsPage() {

  const { productId } = useParams();

  const [ productDetail, setProductDetail ] = useState([]);

  const getProductDetails = () => {

    const storedToken = localStorage.getItem('authToken')

    axios.get(`${API_URL}/${productId}`, { headers: { Authorization: `Bearer ${storedToken}`} })
    .then(response => {
      const product = response.data
      setProductDetail(product)
    })
    .catch((error) => console.log(error))
  }

  useEffect(() => { 
    getProductDetails(); 
  }, [] );

  return (
    <div>
      <h1>Product Details Page</h1>
      <ProductDetailCard {...productDetail} />
    </div>
  )
}

export default ProductDetailsPage;