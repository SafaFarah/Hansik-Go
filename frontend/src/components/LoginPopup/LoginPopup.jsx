import { useState, useContext } from 'react'
import './LoginPopup.css'
import { X } from 'lucide-react'
import { MdVisibility, MdVisibilityOff } from 'react-icons/md'
import api from '../../services/api'
import { StoreContext } from '../../context/StoreContext'

const LoginPopup = ({ setShowLogin }) => {
  const [currentState, setCurrentState] = useState("Login")
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  })
  const { setToken } = useContext(StoreContext);
  const [errorMessage, setErrorMessage] = useState("");


  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true)
    setErrorMessage("");

    try {
      const response = await api.post(currentState === "Login" ? "/user/login" : "/user/register", data)
      setToken(response.data.token);
      localStorage.setItem("token", response.data.token);
      setShowLogin(false)
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Something went wrong.");
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='login-popup'>
      <form onSubmit={onSubmitHandler} className='login-popup-container'>
        <div className="login-popup-title">
          <h2>{currentState}</h2>
          <X onClick={() => setShowLogin(false)} className='close-popup' />
        </div>
        <div className='login-popup-inputs'>
          {currentState === "Login" ? <></> : <input onChange={onChangeHandler} value={data.name} name="name" type='text' placeholder='Your name' required />}
          <input onChange={onChangeHandler} value={data.email} name="email" type='email' placeholder='Your email' required />
          <div className="password-input">
            <input
              onChange={onChangeHandler}
              value={data.password}
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              required
            />
            <button
              type="button"
              className="password-toggle"
              onClick={() => setShowPassword(prev => !prev)}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <MdVisibilityOff /> : <MdVisibility />}
            </button>
          </div>
          {errorMessage && (
            <p className="login-error">{errorMessage}</p>
          )}
        </div>
        <button disabled={isLoading}>
          {isLoading ? "Processing..." : currentState === "Sign Up" ? "Create Account" : "Log in"}
        </button>
        {currentState === "Login" ? <></> :
          <div className='logn-popup-condition'>
            <input type='checkbox' required />
            <p>By continuing, I agree to the terms of use & privacy policy</p>
          </div>
        }
        {currentState === "Login"
          ? <p>Create a new account? <span onClick={() => setCurrentState("Sign Up")}>Click here</span></p>
          : <p>Already have an account? <span onClick={() => setCurrentState("Login")}>Login here</span></p>
        }
      </form>
    </div>
  )
}

export default LoginPopup