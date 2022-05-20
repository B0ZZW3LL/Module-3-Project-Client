import axios from "axios";
import { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";

import Navbar from "../components/Navbar";
import ProductDetailCard from "../components/product/ProductDetailCard";


const BACKEND_API_URL = process.env.REACT_APP_BACKEND_URL;


function ProductDetailsPage() {

  const { productId } = useParams();

  const [ productDetail, setProductDetail ] = useState([]);

  const getProductDetails = () => {

    const storedToken = localStorage.getItem('authToken')

    axios.get(`${BACKEND_API_URL}/product/${productId}`, { headers: { Authorization: `Bearer ${storedToken}`} })
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
      <Navbar />
      <ProductDetailCard {...productDetail} />
    </div>
  )
}

export default ProductDetailsPage;