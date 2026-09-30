import { useState, useContext } from 'react'
import { Navbar } from './components/navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import Cart from './pages/cart/Cart'
import Home from './pages/home/Home'
import PlaceOrder from './pages/placeOrder/PlaceOrder'
import Footer from './components/Footer/Footer'
import LoginPopup from './components/LoginPopup/LoginPopup'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { StoreContext } from './context/StoreContext'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'
import Verify from './pages/Verify/Verify'
import MyOrders from './pages/MyOrders/MyOrders'


const App = () => {

  const { showLogin, setShowLogin } = useContext(StoreContext)

  return (
    <>
      {showLogin && (
        <LoginPopup setShowLogin={setShowLogin} />
      )}
      <main className='app'>
        <Navbar setShowLogin={setShowLogin} />
        <Routes>
          <Route path='/' element={<Home />} />
          < Route path='/cart' element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>} />
          < Route path='/order' element={
            <ProtectedRoute>
              <PlaceOrder />
            </ProtectedRoute>
          } />
          <Route path="/verify" element={<Verify />} />
          <Route
            path="/orders"
            element={
              <ProtectedRoute>
                <MyOrders />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
      <Footer />
      <ToastContainer />
    </>
  )
}

export default App