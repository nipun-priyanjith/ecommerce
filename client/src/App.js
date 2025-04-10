import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useContext } from 'react';


import Bottom from './components/Buttom';

import ZipingForm from './components/ZipingForm';
import Pyment from './components/Pyment';
import MyOrder from './components/MyOrder';
import Home from './User/pages/Home';
import NewHome from './User/pages/NewHome';
import ProductInfo from './components/ProductInfo';
import Login from './User/Auth/Login';
import SignIn from './User/Auth/SignIn';
import Orders from './User/pages/Orders';
import UserData from './User/pages/UserData';
import AHome from './Admin/pages/AHome';
import Inven from './Admin/pages/Inven';
import Product from './Admin/pages/Product';
import Users from './Admin/pages/Users';
import Aloging from './Admin/Auth/Aloging';
import Aregister from './Admin/Auth/Aregister';
import Aorders from './Admin/pages/Aorders';

import { AuthProvider, AuthContext } from './context/AuthContext';
import { AdminAuthProvider, AdminAuthContext ,AdminAuth} from './context/AdminAuthContext';
import { ProductProvider } from './context/ProductContext';

import { CartProvider } from './context/CartContext';
import Carts from './components/Carts';
import USR from './User/pages/USR';
import ADM from './Admin/pages/ADM';
import Fp from './components/Fp';
import Help from './components/Help';
import Setting from './components/Setting';
import PrivacyPolicy from './components/PrivacyPolicy';
import AccountSettings from './components/AccountSettings';
import { ToastContainer } from 'react-toastify';
import Chatbot from './catbot/Chatbot';
function App() {
  const { user } = useContext(AuthContext);
  //const { admin } = useContext(AdminAuthContext);
const{admin}=AdminAuth();
  return (
    <AuthProvider>
      <AdminAuthProvider>
        <ProductProvider><CartProvider>
          <Router>
           
            
            <Routes>
              {/* Public Routes */}
              <Route path='/Chatbot' element={<Chatbot/>}/>
              <Route path="/" element={user?<Home/>:<NewHome />} />
              <Route path="/fp" element={<Fp/>} />
              <Route path="/product/:id" element={<ProductInfo />} />
              {/* <Route path="/login" element={<Login />} /> */}
              <Route path="/login" element={user?<Navigate to="/recom" />:<Login />} />
              <Route path="/re" element={user?<Home/>:<Navigate to="/login" />} />
              <Route path="/SignUp" element={<SignIn />} />
              <Route path="/usr" element={<USR/>} />
              <Route path="/adm" element={<ADM/>}/>

              

              {/* Protected User Routes */}
              <Route
                path="/recom"
                // element={<Home/>}/>
                 element={!user? <Navigate to="/login" />:<Navigate to="/re" /> }/> 
              <Route
                path="/shipping"
                element={user?  <ZipingForm /> : <Login /> }/>       
              <Route
                path="/myorder"
                element={
                  user?<Orders/> : <Login />}/>
              <Route
                path="/user"
                element={user?  <UserData /> : <Login />}/>
              <Route
                path="/cart"
                element={user?  <Carts/> : <Login />}/>
              <Route
                path="/payment"
                element={user?  <Pyment/> : <Login />}/>





              <Route
                path="/setting"
                element={user?  <Setting/> : <Login />}/>                
                    





              {/* Admin Routes */}
              <Route path="/admin"element={admin?<Aorders />:<Navigate to="/alogin" />}/>
              <Route path="/alogin" element={admin?<Navigate to="/admin"/>:<Aloging />} />
              
              <Route
                path="/aorders"
                element={admin?<Aorders />:<Aloging/>}/>
                  
              <Route
                path="/inventary"
                element={admin?<Inven />:<Aloging/>}/>
              <Route
                path="/management"
                element={admin?<Product />:<Aloging/>}/>

                  
            </Routes>
                  {/* Global ToastContainer */}
      <ToastContainer position="top-right" autoClose={5000} />
          </Router></CartProvider>
        </ProductProvider>
      </AdminAuthProvider>
    </AuthProvider>
  );
}


// Protected Route for Users
// const ProtectedRoute = ({ children }) => {
//   const { user } = useContext(AuthContext);

//   if (!user) {
//     return <Navigate to="/login" />;
//   }

//   return children;
// };

// // Protected Route for Admins
// const AdminProtectedRoute = ({ children }) => {
//   const { admin } = useContext(AdminAuthContext);

//   if (!admin) {
//     return <Navigate to="/alogin" />;
//   }

//   return children;
// };
export default App;