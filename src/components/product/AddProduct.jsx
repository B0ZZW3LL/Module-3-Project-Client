import axios from 'axios';
import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../context/auth.context';


const BACKEND_API_URL = process.env.REACT_APP_BACKEND_URL;


function AddProduct({product}) {

  const [ isAdding, setIsAdding ] = useState(false);

  const [ productQty, setProductQty ] = useState(0);

  const [ pantryId, setPantryId ] = useState('');

  const [ pantry, setPantry ] = useState([]);

  const { user } = useContext(AuthContext);

  const storedToken = localStorage.getItem('authToken');

  const handleSelect = e => {
    setPantryId(e.target.value);
    console.log("selected",e.target.value);
  };

  const getPantries = () => {

    axios.get(`${BACKEND_API_URL}/pantry/${user._id}`, { headers: { Authorization: `Bearer ${storedToken}`} })
    .then((response) => {
      const responseArray = response.data;
      setPantry(responseArray);
    })
    .catch((error) => console.log(error));
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

    axios.post(`${BACKEND_API_URL}/product/create`, requestBody, { headers: { Authorization: `Bearer ${storedToken}` } })
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
          <button className="btn btn-outline-success add" onClick={()=> {
            setIsAdding(!isAdding)
            getPantries();
            }}>Add</button>
        </div>
      }
      
      {isAdding && <div className='addproduct'>

        <div className='card-qty'>
            <button type="button" className="btn btn-outline-success" onClick={()=> setProductQty((productQty) => productQty + 1)}> + </button>
            <input type="number" className="form-control" name="productQty" value={productQty} />
            <button type="button" className="btn btn-outline-success" onClick={()=> setProductQty((productQty) => productQty - 1)}> - </button>
        </div>

        <div>
          <select name="pantryId"  id="pantryId" onSelect={handleSelect} onChange={handleSelect}>
            { pantry && pantry.map((pantry) => <option key={pantry._id} value={pantry._id}>{pantry.name}</option> )}
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