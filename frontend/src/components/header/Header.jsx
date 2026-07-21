import React from 'react'
import './Header.css'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <div className='header'>
      <div className="header-content">
        <h2>Delicious Korean Flavors, Delivered to You </h2>
        <p>Explore Korean favorites, pick the dishes you love, and get fresh meals
          delivered quickly to your door.</p>
        <Link to="/#explore-menu">
          <button>View Menu</button>
        </Link>
      </div>

    </div>
  )
}

export default Header