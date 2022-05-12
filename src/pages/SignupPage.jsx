import { useState, useContext } from "react";
import axios from "axios";
import { Container } from 'react-bootstrap';
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from '../context/auth.context';

const API_URL = "http://localhost:5005";

function SignupPage() {

  const navigate = useNavigate();

  const { storeToken, authenticateUser } = useContext(AuthContext)

  const [ formState, setFormState ] = useState({
    displayName:'',
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
      displayName: formState.displayName,
      email: formState.email, 
      password: formState.password
    }

    axios.post(`${API_URL}/auth/signup`, body)
      .then(response => {
        console.log(response);
        storeToken(response.data.authToken);
        authenticateUser();
        setFormState({
          displayName:'',
          email:'',
          password:'',
        })
        navigate('/manage');
     
      })
      .catch(error => console.log(error))
  }


  return(

    <div className='signup'>

      <Container>
        
        <h2>Signup</h2>

        <form onSubmit={handleFormSubmit}>

          <div className="form-floating mb-3">
            <input type="text" className="form-control" id="displayname" placeholder="Enter Display Name" name="displayName" value={formState.displayName} onChange={handleSetFormState} />
            <label htmlFor="displayname" className="form-label">Display name</label>
          </div>

          <div className="form-floating mb-3">
            <input type="email" className="form-control" id="email" placeholder="Enter Email" name="email" value={formState.email} onChange={handleSetFormState} />
            <label htmlFor="email"className="form-label">Email</label>
          </div>

          <div className="form-floating mb-3">
            <input type="password" className="form-control" id="password" placeholder="Enter Password" name="password" value={formState.password} onChange={handleSetFormState} />
            <label htmlFor="password"className="form-label">Password</label>
          </div>

          <div className="form-floating mb-3">
            <input type="password" className="form-control" id="confirm-password" placeholder="Enter Password" name="confirmPassword" />
            <label htmlFor="confirm-password"className="form-label">Confirm password</label>
          </div>

          <div className="d-grid gap-2 col-6 mx-auto">
            <button type="submit" className="btn btn-primary">Signup</button>
          </div>

        </form>

        <h2>Or Login..</h2>

        
        <Link to="/login">
          <div className="d-grid gap-2 col-6 mx-auto">
            <button className="btn btn-primary">Login</button>
          </div>
        </Link>
       

      </Container> 

    </div>
  
    )
}

export default SignupPage;