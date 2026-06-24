import React, { useState } from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'
import { Search, ShoppingBasketIcon } from 'lucide-react';

export const Navbar = () => {
    const [menu, setMenu] = useState("home")
  return (
    <div className='navbar'>
        <img src={assets.logo} alt='' className='logo'/>
        <ul className='navbar-menu'>
            <li onClick={()=> setMenu("home")} className={menu==="home" ? "active" :""}>Home</li>
            <li onClick={()=> setMenu("menu")} className={menu==="menu" ? "active" : ""}>Menu</li>
            <li onClick={()=> setMenu("mobile-app")} className={menu==="mobile-app" ? "active" : ""}>Mobile App</li>
            <li onClick={()=> setMenu("contact-us")} className={menu==="contact-us" ? "active" : ""}>Contact us</li>
        </ul>
        <div className='navbar-right'>
            <div className='navbar-search'>
                <Search />
            </div>
            <div className='navbar-Basket-icon'>
                <ShoppingBasketIcon />
                <div className='dot'></div>
            </div>
            <button>Sign in</button>
        </div>
    </div>
  )
}
