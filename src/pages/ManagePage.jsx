import Navbar from "../components/Navbar";
import PantryList from "../components/pantry/PantryList";
import ProductList from "../components/product/ProductList";


function ManagePage() {
  
  return(
    <div>
      <Navbar />
      <PantryList />
      <ProductList />
    </div>
  )
}

export default ManagePage;