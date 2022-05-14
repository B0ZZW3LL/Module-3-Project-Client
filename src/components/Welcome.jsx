import { useContext } from 'react';
import { AuthContext } from '../context/auth.context';


function Welcome() {

  const { user } = useContext(AuthContext)

  return (
    <div className='welcome-component'>
      { user && (
        <div>
          <h2>Welcome, {user.displayName}</h2>
        </div>
      )}
      { !user && (
        <div>
          <h1 className="welcome-title" >Project-Pantry-App<b>II</b></h1>
          <h2>Welcome!</h2>
        </div>
      )}
    </div>
  )
}

export default Welcome;