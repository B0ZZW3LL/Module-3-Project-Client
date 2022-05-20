import { useState, useContext } from "react";
import axios from "axios";
import { Container } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../context/auth.context';

import Welcome from '../components/Welcome';


const BACKEND_API_URL = process.env.REACT_APP_BACKEND_URL;


function Login() {

  const navigate = useNavigate();

  const { storeToken, authenticateUser } = useContext(AuthContext)

  const [errorMessage, setErrorMessage] = useState(undefined);
  
  const [ formState, setFormState ] = useState({
    email:'',
    password:'',
  })

  const handleSetFormState = event => setFormState({
    ...formState,
    [event.target.name]: event.target.value
  })

  const handleFormSubmit = event => {
    event.preventDefault();

    const body = 
    { 
      email: formState.email, 
      password: formState.password
    }

    axios.post(`${BACKEND_API_URL}/auth/login`, body)
      .then(response => {
        console.log(response);
        console.log('JWT token', response.data.authToken );
        storeToken(response.data.authToken);
        authenticateUser();
        setFormState({
          email:'',
          password:'',
        })
        navigate('/manage');
      })
      .catch((error) => {
        console.log(error)
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      })
  }

  return(
    <div>

      <Welcome />

      <div className='signup bg-dark'>

        <Container>
          
          <h2>Login</h2>

          <form onSubmit={handleFormSubmit}>

            <div className="form-floating mb-3">
              <input type="email" className="form-control" id="email" placeholder="Enter Email" name="email" value={formState.email} onChange={handleSetFormState} />
              <label htmlFor="email"className="form-label">Email</label>
            </div>

            <div className="form-floating mb-3">
              <input type="password" className="form-control" id="password" placeholder="Enter Password" name="password" value={formState.password} onChange={handleSetFormState}   />
              <label htmlFor="password"className="form-label">Password</label>
            </div>

            <div className="d-grid gap-2 col-6 mx-auto">
              <button type="submit" className="btn btn-outline-success">Login</button>
            </div>

            { errorMessage && <p className="error-message">{errorMessage}</p> }

          </form>

        </Container>
    
      </div>

    </div>
  )

}

export default Login;