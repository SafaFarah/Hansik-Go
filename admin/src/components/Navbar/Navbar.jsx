import './Navbar.css'
import { assets } from '../../assets/assets'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/">
        <img
          src={assets.logo}
          alt="HansikGo logo"
          className="navbar-logo"
        />
      </Link>

      <div className="navbar-profile">
        <span className="profile-name">Admin</span>

        <div className="profile-button">
          <img
            src={assets.profileImage}
            alt="Admin profile"
            className="profile-image"
          />
        </div>
      </div>
    </nav>
  )
}

export default Navbar