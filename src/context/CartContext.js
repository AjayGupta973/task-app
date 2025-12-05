import React, { createContext, useContext } from "react";
import cartStore from "../store/CartStore";

export const CartContext = createContext(cartStore);

export const CartProvider = ({ children }) => (
    <CartContext.Provider value={cartStore}>{children}</CartContext.Provider>
);

export const useCart = () => useContext(CartContext);
