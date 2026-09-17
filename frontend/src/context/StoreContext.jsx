import { createContext, useState, useEffect } from "react";
import api from "../services/api"

export const StoreContext = createContext(null)

const StoreContextProvider = (props) => {

    const [cartItems, setItemCount] = useState({});
    const [token, setToken] = useState(
        localStorage.getItem("token") || ""
    )
    const [food_list, setFoodList] = useState([]);

    const fetchFoodList = async () => {
        try {
            const response = await api.get("/food/list");
            setFoodList(response.data.data);
        } catch (error) {
            console.error("Error fetching food list:", error);
        }
    }

    useEffect(() => {
        fetchFoodList();
    }, []);

    
    const addToCart = (itemId) => {
        if (!cartItems[itemId]) {
            setItemCount((prev) => ({ ...prev, [itemId]: 1 }))
        }
        else {
            setItemCount((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }))
        }
    }

    const removeFromCart = (itemId) => {
        setItemCount((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }))
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

    const contextValue = {
        food_list,
        setFoodList,
        cartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        token,
        setToken
    }

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider;