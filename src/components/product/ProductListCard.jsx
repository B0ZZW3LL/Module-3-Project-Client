import { Link } from 'react-router-dom';

import AddProduct from './AddProduct';

function ProductListCard({ _id, barcode_number, images, title, brand, size, category, description, manufacturer, qty, refreshProducts }) {

  const product = {
    image: images,
    barcode_number: barcode_number,
    title: title,
    brand: brand, 
    size: size,
    category: category,
    description: description,
    manufacturer: manufacturer
  }

  return (
    <div className="card-dark bg-dark col-sm-8" style={{ maxWidth: '15rem' }}>

      <div>
        <div className="card-header">
          <Link to={`/products/${barcode_number}`}> 
          <img src={images} alt="product img" className="card-img-top" />
          </Link>
        </div>
      </div>

      <div>
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p>Bardcode: {barcode_number}</p>
        </div>

        <div className='card-footer'>
          <AddProduct product={product} />
        </div>
      </div>
    </div>

  )
}

export default ProductListCard;
