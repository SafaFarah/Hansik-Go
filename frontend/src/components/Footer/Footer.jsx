import './Footer.css'
import { SiFacebook, SiX } from "@icons-pack/react-simple-icons"
import { FaLinkedin } from "react-icons/fa";
import { assets } from '../../assets/assets'
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <footer className='footer' id='footer'>
            <div className='footer-content'>
                <section className='footer-content-left'>
                    <div className="footer-logo">
                        <img src={assets.logo} alt='HansikGo logo' />
                    </div>
                    <p>HansikGo brings the authentic taste of Korean cuisine right to your doorstep.
                        Explore traditional dishes, discover new favorites, and enjoy fast,
                        reliable delivery made with quality and care.</p>
                    <nav className="footer-social-icons" aria-label="Social media">
                        <a href="...">
                            <SiFacebook />
                        </a>

                        <a href="...">
                            <SiX />
                        </a>

                        <a href="...">
                            <FaLinkedin />
                        </a>
                    </nav>
                </section>
                <section className="footer-content-center">
                    <h2>COMPANY</h2>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li>About us</li>
                        <li>Delivery</li>
                        <li>Privacy policy</li>
                    </ul>
                </section>
                <section className='footer-content-right'>
                    <h2>GET IN TOUCH</h2>
                    <ul>
                        <li>
                            <a href="tel:+96600000000">
                                +966 00 000 000
                            </a>
                        </li>
                        <li>
                            <a href="mailto:support@hansikgo.com">
                                support@hansikgo.com
                            </a>
                        </li>
                    </ul>
                </section>
            </div>
            <hr />
            <small className='footer-copyright'>Copyright &copy; 2026 HansikGo.com, All Rights Reserved.</small>
        </footer>
    )
}

export default Footer