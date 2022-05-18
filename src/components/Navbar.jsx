import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/auth.context';


function Navbar() {

  const { logOutUser } = useContext(AuthContext);
  const { user } = useContext(AuthContext)

  return(
        <nav className="navbar navbar-dark bg-dark justify-content-between">
          <h2 className='navbar-brand'>Pantry App II</h2>
          <div className='navbar-right'>
            <p id='navbar-displayName'>{user.displayName},</p>
            <Link to={'/'} className="btn btn-outline-success" type="button">Home </Link>
            <button className="btn btn-outline-success" type="button" onClick={logOutUser}>Logout</button>
          </div>
        </nav>
  )
}

export default Navbar;