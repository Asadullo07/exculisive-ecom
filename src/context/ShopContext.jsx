import React, { createContext, useContext, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { auth, signOut } from '../firebase';

const ShopContext = createContext();

export const ShopProvider = ({ children }) => {
  const { t } = useTranslation();

  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('exclusive_cart');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('exclusive_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('exclusive_user');
      return saved ? JSON.parse(saved) : { name: 'Md Rimel', email: 'rimel1111@gmail.com', address: 'Kingston, 5236, United State' };
    } catch (e) {
      return null;
    }
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    localStorage.setItem('exclusive_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('exclusive_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('exclusive_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('exclusive_user');
    }
  }, [user]);

  const showToast = (message, type = 'info') => {
    const id = Date.now() + Math.random();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3000);
  };

  const addToCart = (product, quantity = 1, color = null) => {
    setCart(prev => {
      const exist = prev.find(item => item.product.id === product.id);
      if (exist) {
        return prev.map(item =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prev, { product, quantity, selectedColor: color || (product.colors && product.colors[0]) || null }];
    });
    showToast(t('common.addedToCart', 'Added to Cart!'), 'success');
  };

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(item => item.product.id !== id));
  };

  const updateCartQuantity = (id, quantity) => {
    if (quantity <= 0) return removeFromCart(id);
    setCart(prev => prev.map(item => item.product.id === id ? { ...item, quantity } : item));
  };

  const clearCart = () => {
    setCart([]);
  };

  const toggleWishlist = (product) => {
    if (wishlist.some(item => item.id === product.id)) {
      setWishlist(prev => prev.filter(item => item.id !== product.id));
      showToast(t('common.removedWishlist', 'Removed from Wishlist!'), 'info');
    } else {
      setWishlist(prev => [...prev, product]);
      showToast(t('common.addedToWishlist', 'Added to Wishlist!'), 'success');
    }
  };

  const isInWishlist = (id) => {
    return wishlist.some(item => item.id === id);
  };

  const moveToBag = (product) => {
    addToCart(product, 1);
    setWishlist(prev => prev.filter(item => item.id !== product.id));
  };

  const moveAllToBag = () => {
    wishlist.forEach(product => addToCart(product, 1));
    setWishlist([]);
    showToast(t('wishlist.moveAll', 'All items moved to bag!'), 'success');
  };

  const applyCoupon = () => {
    showToast('Coupon code applied!', 'info');
    return true;
  };

  const loginUser = (userData) => {
    setUser(userData);
  };

  const logoutUser = () => {
    signOut(auth).catch(() => {});
    setUser(null);
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartSubtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const discountAmount = 0;
  const cartTotal = cartSubtotal;
  const appliedCoupon = '';

  return (
    <ShopContext.Provider
      value={{
        cart,
        wishlist,
        user,
        cartCount,
        cartSubtotal,
        discountAmount,
        cartTotal,
        appliedCoupon,
        searchQuery,
        toasts,
        setSearchQuery,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        toggleWishlist,
        isInWishlist,
        moveToBag,
        moveAllToBag,
        applyCoupon,
        loginUser,
        logoutUser,
        showToast
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => useContext(ShopContext);
export default ShopContext;
