import './App.css';
import Login from './containers/Login/Login';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from './containers/Register/Register';
import Profile from './containers/Profile/Profile';
import React from 'react'


function App() {
  return (
    <div className='App'>
      <Router>
        <Routes>
          <Route path='' element={<Login />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/profile' element={<Profile />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
