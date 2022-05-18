import { Link } from 'react-router-dom';

import AddProduct from './AddProduct';

function ProductListCard({ _id, barcode_number, images, title, brand, size, category, description, manufacturer, qty, pantry, refreshProducts }) {

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

      <div className="card-header">
        <Link to={`/product/${_id}`}> 
        <img src={images} alt="product img" className="card-img-top" />
        </Link>
      </div>

      <div className="card-body">

        <p className="card-title">{title}</p>

        <p>Bardcode: {barcode_number}</p>

        <div className="card-brand">
          <p>{brand}</p>
          <p>{size}</p>
        </div>

        <AddProduct pantry={pantry} product={product} />

      </div>

    </div>

  )
}

export default ProductListCard;
