import { useContext } from 'react';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/auth.context';


function Navbar() {

  const { logOutUser } = useContext(AuthContext);

  return(
      // <Container>
        <nav className="navbar navbar-dark bg-dark justify-content-between">
          <h2 className='navbar-brand'>Pantry App II</h2>
          <div>
            <Link to={'/'} className="btn btn-outline-success" type="button">Home </Link>
            <button className="btn btn-outline-success" type="button" onClick={logOutUser}>Logout</button>
          </div>
        </nav>
      // </Container>
   
  )

}

export default Navbar;