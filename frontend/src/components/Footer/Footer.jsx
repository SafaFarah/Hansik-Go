import React from 'react'
import './Footer.css'
import { SiFacebook, SiX } from "@icons-pack/react-simple-icons"
import { FaLinkedin } from "react-icons/fa";
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
    <div className='footer' id='footer'>
        <div className='footer-content'>
            <div className='footer-content-left'>
                <img src={assets.logo} alt='' />
                <p>HansikGo brings the authentic taste of Korean cuisine right to your doorstep.
                    Explore traditional dishes, discover new favorites, and enjoy fast,
                    reliable delivery made with quality and care.</p>
                <div className='footer-social-icons'>
                    <SiFacebook />
                    <SiX />
                    <FaLinkedin />
                </div>
            </div>
            <div className="footer-content-center">
                <h2>COMPANY</h2>
                <ul>
                    <li>Home</li>
                    <li>About us</li>
                    <li>Delivery</li>
                    <li>Privacy policy</li>
                </ul>
            </div>
            <div className='footer-content-right'>
                <h2>GET IN TOUCH</h2>
                <ul>
                    <li>+966 54 321 789</li>
                    <li>support@hansikgo.com</li>
                </ul>
            </div>
        </div>
        <hr />
        <p className='footer-copyright'>Copyright &copy; 2026 HansikGo.com, All Rights Reserved.</p>
    </div>
  )
}

export default Footer