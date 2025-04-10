import React from 'react'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import {  AdminAuthProvider, AdminAuthContext ,AdminAuth} from '../../context/AdminAuthContext';
import { ProductProvider } from '../../context/ProductContext';
import AHome from './AHome';
import Aloging from '../Auth/Aloging';
import Aorders from './Aorders';

function ADM() {
  const { admin } = useContext(AdminAuthContext);
  return (
    <div>{admin?<Aorders/>:<Aloging/>}</div>
  )
}
export default ADM