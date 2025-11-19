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
import PastaPalaceMenu from './pages/PastaPalaceMenu';
import SizzlingWokMenu from './pages/SizzlingWokMenu';
import BurgerBarnMenu from './pages/BurgerBarnMenu';
import CurryCornerMenu from './pages/CurryCornerMenu';
import GreenBowlMenu from './pages/GreenBowlMenu';

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
          path="/menu/pasta-palace"
          element={isLoggedIn ? <PastaPalaceMenu /> : <Navigate to="/login" />}
        />
        <Route
          path="/menu/sizzling-wok"
          element={isLoggedIn ? <SizzlingWokMenu /> : <Navigate to="/login" />}
        />
        <Route
          path="/menu/burger-barn"
          element={isLoggedIn ? <BurgerBarnMenu /> : <Navigate to="/login" />}
        />
        <Route
          path="/menu/curry-corner"
          element={isLoggedIn ? <CurryCornerMenu /> : <Navigate to="/login" />}
        />
        <Route
          path="/menu/green-bowl"
          element={isLoggedIn ? <GreenBowlMenu /> : <Navigate to="/login" />}
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









