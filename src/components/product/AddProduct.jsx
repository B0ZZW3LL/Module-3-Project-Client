import axios from 'axios';
import { useState, useEffect } from 'react';


const API_URL = "http://localhost:5005/product";


function AddProduct({pantry, product}) {

  const [ isAdding, setIsAdding ] = useState(false);

  const [ productQty, setProductQty ] = useState(0);

  const [ pantryId, setPantryId ] = useState('');

  const handleSelect = e => {
    setPantryId(e.target.value);
    console.log("selected",e.target.value);
  };

  const createProduct = () => {

    const storedToken = localStorage.getItem('authToken');

    const requestBody = {
      image: product.image[0], 
      barcode_number: product.barcode_number, 
      title: product.title, 
      brand: product.brand, 
      size: product.size, 
      category: product.category, 
      description: product.description, 
      manufacturer: product.manufacturer, 
      qty: productQty, 
      pantryId: pantryId 
    }

    axios.post(`${API_URL}/create`, requestBody, { headers: { Authorization: `Bearer ${storedToken}` } })
    .then((response) => {
      console.log(response)
      setIsAdding(false)
      setProductQty(0)
    })
    .catch((error) => console.log(error));
  }

  return(
    <div>

      {!isAdding && 
        <div>
          <button className="btn btn-outline-success add" onClick={()=> setIsAdding(!isAdding)}>Add</button>
        </div>
      }
      
      {isAdding && <div className='addproduct'>

        <div className='card-qty'>
            <button type="button" className="btn btn-outline-success" onClick={()=> setProductQty((productQty) => productQty + 1)}> + </button>
            <input type="number" className="form-control" name="productQty" value={productQty} />
            <button type="button" className="btn btn-outline-success" onClick={()=> setProductQty((productQty) => productQty - 1)}> - </button>
        </div>

        <div>
          <select name="pantryId"  id="pantryId" onChange={handleSelect}>
            { pantry && pantry.map((pantry) => <option key={pantry._id} value={pantry._id} selected>{pantry.name}</option> )}
          </select>
        </div>

        <div>
          <button className="btn btn-outline-success add" onClick={()=> createProduct()}>Add</button>
        </div>

      </div>
      }

    </div>
  )
}

export default AddProduct;