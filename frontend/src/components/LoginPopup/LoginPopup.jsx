import React, { useState } from 'react'
import './LoginPopup.css'
import { X } from 'lucide-react'

const LoginPopup = ({setShowLogin}) => {
  const [currentState, setCurrentState] = useState("Login")

  return (
    <div className= 'login-popup'>
      <form className='login-popup-container'>
        <div className="login-popup-title">
          <h2>{currentState}</h2>
          <X  onClick={()=>setShowLogin(false)} className='close-popup'/>
        </div>
        <div className='login-popup-inputs'>
          {currentState==="Login"?<></>:<input type='text' placeholder='Your name' required />}
          <input type='email' placeholder='Your email' required />
          <input type='password' placeholder='Password' required />
        </div>
        <button>{currentState==="Sign Up"?"Create Account":"Login in"}</button>
        <div className='logn-popup-condition'>
          <input type='checkbox' required />
          <p>By continuing, I agree to the terms pf use & privacy policy</p>
        </div>
        {currentState==="Login"
        ?<p>Create a new account? <span onClick={()=>setCurrentState("Sign Up")}>Click here</span></p>
        :<p>Already have an account? <span onClick={()=>setCurrentState("Login")}>Login here</span></p>
        }
      </form>
    </div>
  )
}

export default LoginPopup