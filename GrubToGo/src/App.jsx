import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home/Home';
import Menu from './pages/Menu/Menu';
import Cart from './pages/Cart/Cart';
import PlaceOrder from './pages/PlaceOrder/PlaceOrder';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  return (
    <div className="app">
      {isLoggedIn && <Navbar />} {/* Navbar visible only after login */}

      <Routes>
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/register" element={<Register setIsLoggedIn={setIsLoggedIn} />} />

        {/* Protected routes */}
        <Route
          path="/"
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
      </Routes>
    </div>
  );
};

export default App;
