import React from 'react'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useContext } from 'react';

import { AuthProvider, AuthContext } from '../../context/AuthContext';
import { ProductProvider } from '../../context/ProductContext';
import Home from './Home';
import Login from '../Auth/Login';

function USR() {
  const { user } = useContext(AuthContext);
  return (
    <div>{user?<Home/>:<Login/>}
    
    </div>
    
  )
}

export default USR