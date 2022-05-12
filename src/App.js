import './App.css';
import { Routes, Route } from 'react-router-dom';


import HomePage from './pages/HomePage';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import ManagePage from './pages/ManagePage';

import ProtectedPage from './components/ProtectedPage';
import PublicPage from './components/PublicPage';
 
function App() {
  return (
    <div className="App">
      
      <Routes>
        <Route path="/" element={<PublicPage><HomePage /></PublicPage>} />
        <Route path="/signup" element={<PublicPage><SignupPage /></PublicPage>} />
        <Route path="/login" element={<PublicPage><LoginPage /></PublicPage>} />
        {/* <Route path="/manage" element={<ManagePage />} /> */}
        <Route path="/manage" element={<ProtectedPage><ManagePage /></ProtectedPage>} />

      </Routes>


    </div>
  );
}

export default App;
