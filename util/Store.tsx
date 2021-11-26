import { createContext, useReducer } from 'react';
import Cookies from 'js-cookie';

const initialState = {
  darkMode: false,
  cart: {
    cartItems: Cookies.get('cartItems')
      ? JSON.parse(Cookies.get('cartItems')!)
      : [],
  },
  user: Cookies.get('user') ? JSON.parse(Cookies.get('user')!) : null,
};

export const Store = createContext<any>(initialState);

function reducer(state: any, action: any) {
  switch (action.type) {
    case 'DARK_MODE_ON':
      return { ...state, darkMode: true };
    case 'DARK_MODE_OFF':
      return { ...state, darkMode: false };
    case 'CART_ADD_ITEM': {
      const newItem = action.payload;
      const existItem = state.cart.cartItems.find(
        (item: any) => item.name === newItem.name,
      );
      const cartItems = existItem
        ? state.cart.cartItems.map((item: any) =>
            item.name === existItem.name ? newItem : item,
          )
        : [...state.cart.cartItems, newItem];
      Cookies.set('cartItems', JSON.stringify(cartItems));
      return { ...state, cart: { ...state.cart, cartItems } };
    }

    case 'CART_DELETE_ITEM': {
      const deleteItem = action.payload;
      const cartItems = state.cart.cartItems.filter(
        (item: any) => item.name !== deleteItem.name,
      );
      Cookies.set('cartItems', JSON.stringify(cartItems));
      return { ...state, cart: { ...state.cart, cartItems } };
    }

    case 'LOGIN': {
      const userLogin = action.payload;

      Cookies.set('user', JSON.stringify(userLogin));

      return {
        ...state,
        user: userLogin,
      };
    }

    case 'LOGOUT': {
      return {
        ...state,
        user: null,
        cart: {
          cartItems: [],
        },
      };
    }

    case 'REGISTER': {
      const userRegister = action.payload;

      Cookies.set('user', JSON.stringify(userRegister));

      return {
        ...state,
        cart: {
          cartItems: [],
        },
        user: userRegister,
      };
    }

    default:
      return state;
  }
}

export function StoreProvider({ children }: any) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <Store.Provider value={value}>{children}</Store.Provider>;
}
