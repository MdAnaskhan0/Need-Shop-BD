import React, { createContext } from 'react';
import all_products from '../assets/all_products';

// Create the context
export const ShopContext = createContext(null);

const ShopContextProvider = ({ children }) => {
    const contextValue = { all_products }; // Store products in context

    return (
        <ShopContext.Provider value={contextValue}>
            {children}
        </ShopContext.Provider>
    );
};

export { ShopContextProvider };
