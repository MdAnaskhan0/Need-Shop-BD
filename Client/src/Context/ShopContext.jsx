import React, { createContext, useEffect, useState } from 'react';



export const ShopContext = createContext(null);

const getDefaultCart = () => {
    let cart = {};

    for (let index = 0; index < 300 + 1; index++) {
        cart[index] = 0;
    }
    return cart;
}

const ShopContextProvider = (props) => {

    const [cartItem, setCartItem] = useState(getDefaultCart());
    const [all_products, setAll_Products] = useState([])

    useEffect(() => {
        fetch('http://localhost:4000/allproducts').then((res) => res.json()).then((data) => setAll_Products(data));
        if (localStorage.getItem('auth-token')) {
            fetch('http://localhost:4000/getcart', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'auth-token': localStorage.getItem('auth-token'),
                    'Content-Type': 'application/json',
                },
                body: "",
            }).then((res) => res.json().then()).then((data) => setCartItem(data))
        }
    }, [])


    const addToCart = (itemId) => {
        setCartItem((prev) => ({ ...prev, [itemId]: (prev[itemId] || 0) + 1 }));

        if (localStorage.getItem('auth-token')) {
            fetch('http://localhost:4000/addtocart', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'auth-token': localStorage.getItem('auth-token'),
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ itemID: itemId }),
            })
                .then((res) => res.json())
                .then((data) => console.log(data))
                .catch((error) => console.error('Fetch Error:', error));
        }
    };

    const removeFromCart = (itemId) => {
        if (localStorage.getItem('auth-token')) {
            fetch('http://localhost:4000/removefromcart', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'auth-token': `${localStorage.getItem('auth-token')}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ itemID: itemId }),
            })
                .then((res) => res.json())
                .then((data) => {
                    console.log(data);

                    if (data.success) {
                        setCartItem((prev) => {
                            const updatedCart = { ...prev };
                            if (updatedCart[itemId] > 0) {
                                updatedCart[itemId] -= 1; 
                            }
                            return updatedCart; 
                        });
                    }
                })
                .catch((error) => console.error('Fetch Error:', error));
        }
    };


    const getTotalCartAmount = () => {
        let totalAmount = 0;

        for (const item in cartItem) {
            if (cartItem[item] > 0) {
                const itemInfo = all_products.find(
                    (product) => product.id === Number(item)
                );
                if (itemInfo) {
                    totalAmount += itemInfo.new_price * cartItem[item];
                }
            }
        }

        return totalAmount;
    };

    const getTotalCartItem = () => {
        let totalItem = 0;
        for (const item in cartItem) {
            if (cartItem[item] > 0) {
                totalItem += cartItem[item];
            }
        }
        return totalItem;
    }


    const contextValue = { getTotalCartAmount, all_products, cartItem, addToCart, removeFromCart, getTotalCartItem };

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    );
};

export { ShopContextProvider };
