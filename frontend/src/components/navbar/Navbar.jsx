import React, { useContext } from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'
import { Search, ShoppingBasketIcon } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext';

export const Navbar = ({ setShowLogin }) => {

    const location = useLocation();

    const { getTotalCartAmount } = useContext(StoreContext);

    return (
        <nav className='navbar'>
            <Link to='/'><img src={assets.logo} alt='HansikGo logo' className='logo' /></Link>
            <ul className='navbar-menu'>
                <li>
                <Link to='/' className={location.pathname === "/" && location.hash === ""
                    ? "active" : ""}>Home</Link>
                </li>
                <li>
                <Link to="/#explore-menu" className={location.hash === "#explore-menu"
                    ? "active" : ""}>Menu</Link>
                </li>
                <li>
                <Link to="/#app-download" className={location.hash === "#app-download"
                    ? "active" : ""}>Mobile App</Link>
                </li>
                <li>
                <Link to="/#footer" className={location.hash === "#footer"
                    ? "active" : ""}>Contact us</Link>
                </li>
            </ul>
            <div className='navbar-right'>
                <div className='navbar-search'>
                    <Search />
                </div>
                <div className='navbar-Basket-icon'>
                    <Link to='/cart' aria-label="Shopping Cart"><ShoppingBasketIcon /></Link>
                    <div className={getTotalCartAmount() === 0 ? "" : 'dot'}></div>
                </div>
                <button onClick={() => setShowLogin(true)}>Sign in</button>
            </div>
        </nav>
    )
}
