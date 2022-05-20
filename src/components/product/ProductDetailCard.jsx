function ProductDetailCard({ image, images, barcode_number, title, brand, size, category, description, manufacturer }) {

  return(
    <div>
      <div className="card-header">

          {image && <img src={image} alt="product img" className="card-img-top" /> }
          {!image && <img src={images} alt="product img" className="card-img-top" /> }
          
          <p>Barcode: {barcode_number}</p>
          <p>Title: {title}</p>
          <p>Brand: {brand}</p>
          <p>Size: {size}</p>
          <p>Category: {category}</p>
          <p>Manufacturer: {manufacturer}</p>
          <p>Description: {description}</p>
         </div>
    </div>
  )
}

export default ProductDetailCard;