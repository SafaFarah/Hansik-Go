import { useContext, useState } from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'
import { Search, ShoppingBasketIcon, UserRound, Package, LogOut } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext';

export const Navbar = ({ setShowLogin }) => {

    const location = useLocation();
    const { getTotalCartAmount, token, setToken, requireAuth } = useContext(StoreContext);
    const [showProfileMenu, setShowProfileMenu] = useState(false)
    const navigate = useNavigate()

    const handleLogout = () => {
        localStorage.removeItem('token')
        setToken('')
        navigate('/')
    }


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
                    <button
                        onClick={() => {
                            if (!requireAuth()) return
                            navigate('/cart')
                        }}
                        aria-label="Shopping Cart"
                    >
                        <ShoppingBasketIcon />
                    </button>
                    <div className={getTotalCartAmount() === 0 ? "" : 'dot'}></div>
                </div>
                {!token ? (
                    <button
                        className="sign-in-btn"
                        onClick={() => setShowLogin(true)}>
                        Sign in
                    </button>
                ) : (
                    <div className="profile-menu">
                        <button
                            className="profile-icon"
                            onClick={() => setShowProfileMenu(prev => !prev)}
                            aria-label="Open profile menu"
                        >
                            <UserRound size={24} />
                        </button>

                        {showProfileMenu && (
                            <div className="profile-dropdown">
                                <button>
                                    <Package size={20} />
                                    <span>Orders</span>
                                </button>
                                <hr />
                                <button onClick={handleLogout}>
                                    <LogOut size={20} />
                                    <span>Logout</span>
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </nav>
    )
}
