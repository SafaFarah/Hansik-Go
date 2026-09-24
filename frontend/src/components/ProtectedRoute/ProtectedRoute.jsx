import { Navigate } from 'react-router-dom'
import { useContext, useEffect } from 'react'
import { StoreContext } from '../../context/StoreContext'
import { isTokenValid } from '../../utils/auth'

const ProtectedRoute = ({ children }) => {
  const { token, setShowLogin } = useContext(StoreContext)

  const valid = Boolean(token && isTokenValid(token))

  useEffect(() => {
    if (!valid) {
      setShowLogin(true)
    }
  }, [valid])

  if (!valid) {
    return <Navigate to="/" replace />
  }

  return children
}

export default ProtectedRoute