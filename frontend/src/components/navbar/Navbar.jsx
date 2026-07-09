import React, { useState } from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'
import { Search, ShoppingBasketIcon } from 'lucide-react';
import { Link } from 'react-router-dom'

export const Navbar = () => {
    const [menu, setMenu] = useState("home")
  return (
    <div className='navbar'>
        <img src={assets.logo} alt='' className='logo'/>
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
                <ShoppingBasketIcon />
                <div className='dot'></div>
            </div>
            <button>Sign in</button>
        </div>
    </div>
  )
}
