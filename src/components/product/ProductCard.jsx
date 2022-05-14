import axios from 'axios';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';


const API_URL = "http://localhost:5005/product";


function ProductCard({ _id, image, title, brand, size, qty, refreshProducts }) {

  const [ productQty, setProductQty ] = useState(qty);

  const updateProductQty = () => {

    const storedToken = localStorage.getItem('authToken');
    const requestBody = { productQty }

    axios.put(`${API_URL}/change/${_id}`, requestBody, { headers: { Authorization: `Bearer ${storedToken}` } })
    .then((response) => {
      console.log(response)
    })
    .catch((error) => console.log(error));
  }

  const removeProduct = () => {

    const storedToken = localStorage.getItem('authToken');

    axios.delete(`${API_URL}/remove/${_id}`, { headers: { Authorization: `Bearer ${storedToken}` } })
    .then((response) => {
      console.log(response);
      refreshProducts();
    })
    .catch((error) => console.log(error));
  };

  // useEffect(() => { 
  //   updateProductQty(); 
  // }, [productQty] );

  return (
    <div className="card-dark bg-dark col-sm-8" style={{ maxWidth: '15rem' }}>

      <div className="card-header">
        <Link to={`/product/${_id}`}> 
        <img src={image} alt="product img" className="card-img-top" />
        </Link>
      </div>

      <div className="card-body">

        <p className="card-title">{title}</p>

        <div className="card-brand">
          <p>{brand}</p>
          <p>{size}</p>
        </div>

        <div className="card-qty">
          <button className="btn btn-outline-success" onClick={()=> setProductQty((productQty) => productQty + 1)}> + </button>
          <input type="number" className="form-control" name="productQty" value={productQty} />
          {/* <input type="number" className="form-control" name="productQty" value={productQty} onChange={updateProductQty} /> */}
          <button className="btn btn-outline-success" onClick={()=> setProductQty((productQty) => productQty - 1)}> - </button>
        </div>

      </div>

      <div className="card-footer">
        <button className="btn btn-outline-success" onClick={removeProduct}>Remove</button>
      </div>

    </div>

  )
}

export default ProductCard;
