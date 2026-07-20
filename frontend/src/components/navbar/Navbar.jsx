import React, { useContext, useState } from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'
import { Search, ShoppingBasketIcon } from 'lucide-react';
import { Link } from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext';

export const Navbar = ({setShowLogin}) => {

    const [menu, setMenu] = useState("home")
    const {getTotalCartAmount} = useContext(StoreContext);

  return (
    <div className='navbar'>
        <Link to='/'><img src={assets.logo} alt='' className='logo'/></Link>
        <ul className='navbar-menu'>
            <Link to='/' onClick={()=> setMenu("home")} className={menu==="home" ? "active" :""}>Home</Link>
            <a href='#explore-menu' onClick={()=> setMenu("menu")} className={menu==="menu" ? "active" : ""}>Menu</a>
            <a href='#app-download' onClick={()=> setMenu("mobile-app")} className={menu==="mobile-app" ? "active" : ""}>Mobile App</a>
            <a href='#footer' onClick={()=> setMenu("contact-us")} className={menu==="contact-us" ? "active" : ""}>Contact us</a>
        </ul>
        <div className='navbar-right'>
            <div className='navbar-search'>
                <Search />
            </div>
            <div className='navbar-Basket-icon'>
                <Link to='/cart'><ShoppingBasketIcon /></Link>
                <div className={getTotalCartAmount() === 0 ? "":'dot'}></div>
            </div>
            <button onClick={()=>setShowLogin(true)}>Sign in</button>
        </div>
    </div>
  )
}
