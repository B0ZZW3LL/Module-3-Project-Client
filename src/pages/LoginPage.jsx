import { useState, useContext } from "react";
import axios from "axios";
import { Container } from 'react-bootstrap';
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from '../context/auth.context';

import Welcome from '../components/Welcome';

const API_URL ="http://localhost:5005"


function Login() {

  const navigate = useNavigate();

  const { storeToken, authenticateUser } = useContext(AuthContext)
  
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

    axios.post(`${API_URL}/auth/login`, body)
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
      .catch(error => console.log(error))
  }

  return(
    <div>

      <Welcome />

      <div className='signup'>

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
              <button type="submit" className="btn btn-primary">Login</button>
            </div>

          </form>

        </Container>
    
      </div>

    </div>
  )

}

export default Login;