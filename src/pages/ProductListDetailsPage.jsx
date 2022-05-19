import axios from "axios";
import { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";

import Navbar from "../components/Navbar";
import ProductDetailCard from "../components/product/ProductDetailCard";


const PRODUCT_API_URL = process.env.REACT_APP_PRODUCT_API_URL


function ProductListDetailsPage() {

  const { barcode_number } = useParams();

  const [ productDetail, setProductDetail ] = useState([]);

  const getProductDetails = () => {

    const storedToken = localStorage.getItem('authToken')

    axios.get(`${PRODUCT_API_URL}/products?barcode_number=${barcode_number}`, { headers: { Authorization: `Bearer ${storedToken}`} })
    .then(response => {
      const product = response.data
      setProductDetail(product[0])
    })
    .catch((error) => console.log(error))
  }

  useEffect(() => { 
    getProductDetails(); 
  }, [] );

  return (
    <div>
      <Navbar />
      <h1>Product Details Page</h1>
      <ProductDetailCard {...productDetail } />
    </div>
  )
}

export default ProductListDetailsPage;

