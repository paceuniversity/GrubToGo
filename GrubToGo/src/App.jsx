import React, { useState } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home/Home';
import Menu from './pages/Menu/Menu';
import Cart from './pages/Cart/Cart';
import PlaceOrder from './pages/PlaceOrder/PlaceOrder';
import Deals from './pages/Deals/Deals';
import Profile from './pages/Profile/Profile';
import OrderQueue from './pages/OrderQueue/OrderQueue';
import OrderDetails from './pages/OrderDetails/OrderDetails';
import { CartProvider } from './context/CartContext';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import CatererDashboard from './pages/CatererDashboard/CatererDashboard';
import PastaPalaceMenu from './pages/PastaPalaceMenu';
import SizzlingWokMenu from './pages/SizzlingWokMenu';
import BurgerBarnMenu from './pages/BurgerBarnMenu';
import CurryCornerMenu from './pages/CurryCornerMenu';
import MyOrders from './pages/MyOrders/MyOrders';
import CartFab from './components/CartFab';


const App = () => {
    // State to track if user is logged in and what role (student or caterer)
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null); // 'student' or 'caterer'
  const [queuedOfferings, setQueuedOfferings] = useState([]); // Caterer offering queue

  return (
    <CartProvider>
      <div className="app">
        {isLoggedIn && (
          <>
              {/* Show navbar and floating cart button only after login */}
            <Navbar
              isLoggedIn={isLoggedIn}
              setIsLoggedIn={setIsLoggedIn}
              userRole={userRole}
            />
            {/* Show cart only for non-caterer users */}
            {userRole !== 'caterer' && <CartFab />}
          </>
        )}

        <Routes>
          {/* default route */}
          {/* Redirect root URL to login page */}
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
            path="/deals"
            element={isLoggedIn ? <Deals /> : <Navigate to="/login" />}
          />
          <Route
            path="/cart"
            element={isLoggedIn ? <Cart /> : <Navigate to="/login" />}
          />
          <Route
            path="/my-orders"
            element={isLoggedIn ? <MyOrders /> : <Navigate to="/login" />}
          />
          <Route
            path="/order"
            element={isLoggedIn ? <PlaceOrder /> : <Navigate to="/login" />}
          />
          <Route
            path="/profile"
            element={isLoggedIn ? <Profile /> : <Navigate to="/login" />}
          />

          <Route
            path="/student"
            element={isLoggedIn ? <Menu /> : <Navigate to="/login" />}
          />

          {/* Caterer Home */}
          {/* Routes available only for caterer role */}
          <Route
            path="/staff"
            element={
              isLoggedIn && userRole === 'caterer'
                ? <CatererDashboard queuedOfferings={queuedOfferings} setQueuedOfferings={setQueuedOfferings} />
                : <Navigate to="/login" />
            }
          />

          {/* Caterer Order Queue */}
          <Route
            path="/staff/queue"
            element={
              isLoggedIn && userRole === 'caterer'
                ? <OrderQueue queuedOfferings={queuedOfferings} setQueuedOfferings={setQueuedOfferings} />
                : <Navigate to="/login" />
            }
          />

          {/* Caterer Order Details */}
          <Route
            path="/staff/orders"
            element={
              isLoggedIn && userRole === 'caterer'
                ? <OrderDetails />
                : <Navigate to="/login" />
            }
          />
        </Routes>
      </div>
    </CartProvider>
  );
};

export default App;
