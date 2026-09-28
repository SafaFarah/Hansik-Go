import { createContext, useState, useEffect } from "react";
import api from "../services/api"
import { isTokenValid } from "../utils/auth"
import { toast } from 'react-toastify'

export const StoreContext = createContext(null)

const StoreContextProvider = (props) => {
    const [food_list, setFoodList] = useState([]);
    const [cartItems, setCartItems] = useState({});

    const [showLogin, setShowLogin] = useState(false)

    const storedToken = localStorage.getItem("token")
    const validToken = isTokenValid(storedToken)
    if (storedToken && !validToken) {
        localStorage.removeItem("token")
    }
    const [token, setToken] = useState(
        validToken ? storedToken : ""
    )

    const requireAuth = () => {
        if (!token || !isTokenValid(token)) {
            localStorage.removeItem("token")
            setToken("")
            setShowLogin(true)
            return false
        }
        return true
    }

    // Get food from database
    const fetchFoodList = async () => {
        try {
            const response = await api.get("/food/list");
            setFoodList(response.data.data);
        } catch (error) {
            console.error("Error fetching food list:", error);
            toast.error(
                error.response?.data?.message || "Failed to load food items."
            )
        }
    }

    // Get user's cart from database
    const fetchCart = async () => {
        if (!token) return
        try {
            const response = await api.get('/cart/get')
            if (response.data.success) {
                setCartItems(response.data.cartData)
            }
        } catch (error) {
            console.error('Error fetching cart:', error)
            toast.error(
                error.response?.data?.message || "Failed to load your cart."
            )
        }
    }

    // Add food
    const addToCart = async (itemId) => {
        if (!token) return
        try {
            const response = await api.post('/cart/add', { foodId: itemId })
            if (response.data.success) {
                setCartItems(prev => ({
                    ...prev, [itemId]: (prev[itemId] || 0) + 1
                }))
            }
        } catch (error) {
            console.error('Error adding food to cart:', error)
            toast.error(
                error.response?.data?.message || "Failed to add item to cart."
            )
        }
    }

    // Remove food
    const removeFromCart = async (itemId) => {
        if (!token) return
        try {
            const response = await api.post('/cart/remove', { foodId: itemId })
            if (response.data.success) {
                setCartItems(prev => {
                    const updatedCart = { ...prev }
                    if (updatedCart[itemId] > 1) {
                        updatedCart[itemId] -= 1
                    } else {
                        delete updatedCart[itemId]
                    }
                    return updatedCart
                })
            }
        } catch (error) {
            console.error('Error removing food from cart:', error)
            toast.error(
                error.response?.data?.message || "Failed to remove item from cart."
            )
        }
    }

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = food_list.find((product) => product._id === item)
                totalAmount += itemInfo.priceCent * cartItems[item];
            }
        }
        return (totalAmount / 100);
    }

    useEffect(() => {
        fetchFoodList();
    }, []);

    useEffect(() => {
        fetchCart()
    }, [token])


    const contextValue = {
        food_list,
        
        cartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,

        token,
        setToken,
        requireAuth,

        showLogin,
        setShowLogin
    }

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider;