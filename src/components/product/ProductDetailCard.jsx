function ProductDetailCard({ image, barcode, title, brand, size, category, description, manufacturer }) {

  return(
    <div>
      <h1>Product Detail Component</h1>

      <div className="card-header">
          <img src={image} alt="product img" className="card-img-top" />
          <p>Barcode: {barcode}</p>
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