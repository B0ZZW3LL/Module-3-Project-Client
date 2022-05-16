import { Link } from 'react-router-dom';

function ProductListCard({ _id, barcode_number, images, title, brand, size, qty, refreshProducts }) {

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

      </div>

    </div>

  )
}

export default ProductListCard;
