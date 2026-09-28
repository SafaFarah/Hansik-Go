import { Navigate } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'
import { StoreContext } from '../../context/StoreContext'
import { isTokenValid } from '../../utils/auth'

const ProtectedRoute = ({ children }) => {
    const { token, setShowLogin } = useContext(StoreContext)

    const [allowed] = useState(() => {
        return Boolean(token && isTokenValid(token))
    })

    useEffect(() => {
        if (!allowed) {
            setShowLogin(true)
        }
    }, [allowed, setShowLogin])

    if (!allowed) {
        return <Navigate to="/" replace />
    }

    return children
}

export default ProtectedRoute