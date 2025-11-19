import React, { useState } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home/Home';
import Menu from './pages/Menu/Menu';
import Cart from './pages/Cart/Cart';
import PlaceOrder from './pages/PlaceOrder/PlaceOrder';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import CatererDashboard from './pages/CatererDashboard/CatererDashboard';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null); // 'student' or 'caterer'

  return (
    <div className="app">
      {isLoggedIn && (
        <Navbar
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
          userRole={userRole}
        />
      )}

      <Routes>
        {/* default route */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* auth */}
        <Route
          path="/login"
          element={
            <Login
              setIsLoggedIn={setIsLoggedIn}
              setUserRole={setUserRole}
            />
          }
        />
        <Route
          path="/register"
          element={
            <Register
              setIsLoggedIn={setIsLoggedIn}
              setUserRole={setUserRole}
            />
          }
        />

        
        <Route
          path="/home"
          element={isLoggedIn ? <Home /> : <Navigate to="/login" />}
        />
        <Route
          path="/menu"
          element={isLoggedIn ? <Menu /> : <Navigate to="/login" />}
        />
        <Route
          path="/cart"
          element={isLoggedIn ? <Cart /> : <Navigate to="/login" />}
        />
        <Route
          path="/order"
          element={isLoggedIn ? <PlaceOrder /> : <Navigate to="/login" />}
        />

        
        <Route
          path="/student"
          element={isLoggedIn ? <Menu /> : <Navigate to="/login" />}
        />

      
        {/* Caterer Home  */}
        <Route
          path="/staff"
          element={
            isLoggedIn && userRole === 'caterer'
              ? <CatererDashboard />
              : <Navigate to="/login" />
          }
        />

        {/* Caterer Order Details */}
        <Route
          path="/staff/orders"
          element={
            isLoggedIn && userRole === 'caterer'
              ? <CatererDashboard />
              : <Navigate to="/login" />
          }
        />
      </Routes>
    </div>
  );
};

export default App;









