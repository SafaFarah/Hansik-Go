import { jwtDecode } from 'jwt-decode'

export const isTokenValid = (token) => {
  if (!token) return false

  try {
    const { exp } = jwtDecode(token)

    if (!exp) return false

    return exp * 1000 > Date.now()
  } catch {
    return false
  }
}