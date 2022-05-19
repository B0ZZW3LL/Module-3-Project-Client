import React, { useState, useEffect } from "react";
import axios from "axios";

const BACKEND_API_URL = process.env.REACT_APP_BACKEND_URL;
 
const AuthContext = React.createContext();

function AuthProviderWrapper(props) {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  // Handle JWT token local storage when received from backend //
  const storeToken = (token) => {
    localStorage.setItem('authToken', token);
  } 

  // Handle user/JWT token validation //
  const authenticateUser = () => {
    const storedToken = localStorage.getItem('authToken')

    if (storedToken) {
      // We must send the JWT token in the request's "Authorization" Headers
      axios.get(`${BACKEND_API_URL}/auth/verify`, { headers: { Authorization: `Bearer ${storedToken}`} }
      )
      .then((response) => {
        // console.log(response);
        const user = response.data;
        setIsLoggedIn(true);
        setIsLoading(false);
        setUser(user); 
      })
      .catch((error) => {
        console.log(error);
        setIsLoggedIn(false);
        setIsLoading(false);
        setUser(null);  
      })
    } else {
      setIsLoggedIn(false);
      setIsLoading(false);
      setUser(null); 
    }
  }

  const removeToken = () => {
    localStorage.removeItem('authToken');
  }

  const logOutUser = () => {
    removeToken();            // <-- drop token from localstorage
    authenticateUser();       // <-- run, now without token - state variables gets "reset"
  }

  //Let's run on initial app load to see if token already exists (logged in -> closed browser -> came back)
  useEffect(() => {                 //  <==  ADD                                   
    authenticateUser();
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, isLoading, user, storeToken, authenticateUser, logOutUser }}>
      {props.children}
    </AuthContext.Provider>
  )
}
 
export { AuthProviderWrapper, AuthContext };