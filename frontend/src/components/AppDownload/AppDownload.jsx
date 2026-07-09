import React from 'react'
import './AppDownload.css'
import { FaGooglePlay } from 'react-icons/fa'
import { assets } from '../../assets/assets'

const AppDownload = () => {
  return (
    <div className='app-download' id='app-download'>
      <p> For Better Experience Download <br /> HansikGo App</p>
      <div className="app-download-platforms">
        <img className='play-store' src={assets.playStore} alt="Get it on Google Play" />
        <img className='app-store' src={assets.appStore} alt="Download on the App Store" />
      </div>
    </div>
  )
}

export default AppDownload