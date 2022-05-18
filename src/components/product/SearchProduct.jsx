import { useState } from 'react';

function SearchProduct(props) {

  const [ nameSearchTerm, setNameSearchTerm ] = useState('');
  const [ barcodeSearchTerm, setBarcodeSearchTerm ] = useState('');

  const handleNameSearch = event => {
    setNameSearchTerm(event.target.value);
    props.nameSearch(event.target.value);
  }

  const handleBarcodeSearch = event => {
    setBarcodeSearchTerm(event.target.value);
    props.barcodeSearch(event.target.value);
  }

  return (
    <div>
      <h1>Search Products</h1>

      <div className="form-floating mb-3">
        <input type="text" className="form-control" id="searchName" name="searchName" placeholder='searchName' value={nameSearchTerm} onChange={handleNameSearch} />
        <label htmlFor="searchName" className="form-label">Search Name</label>
      </div>

      <div className="form-floating mb-3">
        <input type="text" className="form-control" id="searchBarcode" name="searchBarcode" placeholder='searchBarcode' value={barcodeSearchTerm} onChange={handleBarcodeSearch} />
        <label htmlFor="searchBarcode" className="form-label">Search Barcode</label>
      </div>

    </div>
  )

}

export default SearchProduct;