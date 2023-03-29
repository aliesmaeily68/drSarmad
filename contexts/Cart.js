import { useReducer, createContext } from "react";
import cookies from "js-cookie";
export const CartContext = createContext();

const initialvalue = cookies.get("cartProducts")
  ? JSON.parse(cookies.get("cartProducts"))
  : { cart: { cartProducts: [] } };

function reducer(state, action) {
  switch (action.type) {
    case "ADD_PRODUCT": {
      const newProduct = action.payload;

      const exisitingProduct = state.cart.cartProducts.find(
        (product) => product.slug === newProduct.slug
      );
      const cartProducts = exisitingProduct
        ? state.cart.cartProducts.map((product) =>
            product.title === exisitingProduct.title ? newProduct : product
          )
        : [...state.cart.cartProducts, newProduct];
      cookies.set(
        "cartProducts",
        JSON.stringify({ ...state, cart: { ...state.cart, cartProducts } })
      );
      return { ...state, cart: { ...state.cart, cartProducts } };
    }
    case "REMOVE_PRODUCT": {
      const productSlug = action.productSlug;

      const cartProducts = state.cart.cartProducts.filter(
        (product) => product.slug !== productSlug
      );
      cookies.set(
        "cartProducts",
        JSON.stringify({ ...state, cart: { ...state.cart, cartProducts } })
      );
      return { ...state, cart: { ...state.cart, cartProducts } };
    }
    case "INCRIES_PRODUCT": {
      const newIncreiseProduct = action.increiseProduct;
      const cartProducts = state.cart.cartProducts.filter(
        (product) => product.slug !== newIncreiseProduct.slug
      );
      cookies.set(
        "cartProducts",
        JSON.stringify({
          ...state,
          cart: {
            ...state.cart,
            ...cartProducts,
            ...newIncreiseProduct.exisitingProduct,
          },
        })
      );
      return {
        ...state,
        cart: {
          ...state.cart,
          ...cartProducts,
          ...newIncreiseProduct.exisitingProduct,
        },
      };
    }
    case "DECRIES_PRODUCT": {
      const newDecreiseProduct = action.decreiseProduct;
      const cartProducts = state.cart.cartProducts.filter(
        (product) => product.slug !== newDecreiseProduct.slug
      );

      cookies.set(
        "cartProducts",
        JSON.stringify({
          ...state,
          cart: {
            ...state.cart,
            ...cartProducts,
            ...newDecreiseProduct.exisitingProduct,
          },
        })
      );
      return {
        ...state,
        cart: {
          ...state.cart,
          ...cartProducts,
          ...newDecreiseProduct.exisitingProduct,
        },
      };
    }
    default:
      state;
  }
}

export function CartContextProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialvalue);
  const value = { state, dispatch };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
