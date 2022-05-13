function ProductCard({ title }) {

  return (
    <div className="card-dark bg-dark" style={{ maxWidth: '18rem' }}>
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
        </div>
    </div>

  )

}

export default ProductCard;