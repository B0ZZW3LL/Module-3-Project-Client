function PantryCard({ name }) {

  return (
    <div className="card" style={{ width: '18rem' }}>
        <div className="card-body">
          <h5 className="card-title">{name}</h5>
        </div>
    </div>
  )

}

export default PantryCard;