import React, {createContext, useContext, useState} from 'react';
import {toast} from 'react-hot-toast';
import {ProductModel} from "../models/product";
import {CartItemModel} from "../models/cart_item";

interface ContextInterface {
    qty: number;
    resetQty: () => void;
    incrementQty: () => void;
    decrementQty: () => void;
    addToCart: (product: ProductModel, quantity: number) => void;
    showCart: boolean;
    setShowCart: (value: boolean) => void;
    cartItems: CartItemModel[];
    setCartItems: (value: CartItemModel[]) => void;
    totalPrice: number;
    setTotalPrice: (value: number) => void;
    totalQuantities: number;
    setTotalQuantities: (value: number) => void;
    updateCartItemQuantity: (id: string, value: string) => void;
    removeCartItem: (id: string) => void;
}

const Context = createContext({} as ContextInterface);

interface StateContextInterface {
    children: React.ReactNode;
}

export const StateContext = ({children}: StateContextInterface) => {
    const [showCart, setShowCart] = useState(false);
    const [cartItems, setCartItems] = useState<CartItemModel[]>([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalQuantities, setTotalQuantities] = useState(0);
    const [qty, setQty] = useState(1);

    function resetQty() {
        setQty(1);
    }

    function incrementQty() {
        setQty(prevQty => prevQty + 1);
    }

    function decrementQty() {
        setQty(prevQty => {
            if (prevQty - 1 < 1) return 1
            return prevQty - 1
        })
    }

    function addToCart(product: ProductModel, quantity: number) {
        const isProductInCart = cartItems.find(item => item._id === product._id);

        setTotalPrice(prevTotalPrice => prevTotalPrice + product.price * quantity)
        setTotalQuantities(prevTotalQuantities => prevTotalQuantities + quantity)

        let updatedCartItems: CartItemModel[];
        if (isProductInCart) {
            updatedCartItems = cartItems.map(cartItem => {
                if (cartItem._id === product._id) {
                    return {...cartItem, quantity: cartItem.quantity + quantity}
                }
                return cartItem;
            })
        } else {
            updatedCartItems = [...cartItems, {...product, quantity}];
        }

        setCartItems(updatedCartItems);
        toast.success(`${qty} ${product.name} added to cart`);
    }

    function updateCartItemQuantity(id: string, value: string) {
        const foundProduct = cartItems.find(item => item._id === id);

        let updatedItems = [...cartItems];
        if (value === 'inc') {
            updatedItems = cartItems.map(item => {
                if (item._id === id) {
                    item.quantity = item.quantity + 1;
                }
                return item;
            })
            setTotalPrice(prevTotalPrice => prevTotalPrice + foundProduct!.price);
            setTotalQuantities(prevTotalQuantities => prevTotalQuantities + 1);
        } else if (value === 'dec') {
            if (foundProduct && foundProduct.quantity > 1) {
                updatedItems = cartItems.map(item => {
                    if (item._id === id && item.quantity > 1) {
                        item.quantity = item.quantity - 1;
                    }
                    return item;
                })
                setTotalPrice(prevTotalPrice => prevTotalPrice - foundProduct!.price);
                setTotalQuantities(prevTotalQuantities => prevTotalQuantities - 1);
            }
        }
        setCartItems(updatedItems);
    }

    function removeCartItem(id: string) {
        const cartItem = cartItems.find(item => item._id === id);
        if (cartItem) {
            setCartItems([...cartItems.filter(item => item._id !== id)]);
            setTotalPrice(prevTotalPrice => prevTotalPrice - cartItem.price * cartItem.quantity);
            setTotalQuantities(prevTotalQuantities => prevTotalQuantities - cartItem.quantity);
        }
    }

    return <Context.Provider value={{
        showCart,
        cartItems,
        totalPrice,
        totalQuantities,
        qty,
        incrementQty,
        decrementQty,
        addToCart,
        setShowCart,
        updateCartItemQuantity,
        removeCartItem,
        resetQty,
        setTotalPrice,
        setCartItems,
        setTotalQuantities
    } as ContextInterface}>{children}
    </Context.Provider>
}

export const useStateContext = () => useContext(Context);
