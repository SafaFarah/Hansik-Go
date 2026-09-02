import './Header.css'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <header className='header'>
      <section className="header-content">
        <h1>Delicious Korean Flavors, Delivered to You </h1>
        <p>Explore Korean favorites, pick the dishes you love, and get fresh meals
          delivered quickly to your door.</p>
        <Link to="/#explore-menu" className="view-menu-btn">
          View Menu
        </Link>
      </section>

    </header>
  )
}

export default Header