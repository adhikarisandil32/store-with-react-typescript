import { useContext, createContext, ReactNode, useState } from "react"
import ShoppingCart from "../components/ShoppingCart"
import storeItems from "../data/data.json"

type ShoppingCartProviderProps = {
  children: ReactNode
}

type CartItem = {
  id: number
  quantity: number
} //id - to identify the item, quantity - to identify the numbers of item

type ShoppingCartContext = {
  openCart: () => void
  closeCart: () => void
  getItemQuantity: (id: number) => number
  increaseCartQuantity: (id: number) => void
  decreaseCartQuantity: (id: number) => void
  removeFromCart: (id: number) => void
  cartItems: CartItem[]
  cartQuantity: number
  cartTotalPrice: number
}

const ShoppingCartContext = createContext({} as ShoppingCartContext)

export function useShoppingCart() {
  return useContext(ShoppingCartContext)
}

export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [isOpen, setIsOpen] = useState<boolean>(false)

  function getItemQuantity(id: number) {
    return cartItems.find((item) => item.id === id)?.quantity || 0
  }

  function increaseCartQuantity(id: number) {
    setCartItems((currItems) => {
      if (currItems.find((item) => item.id === id) == null) {
        return [...currItems, { id, quantity: 1 }]
      } else {
        return currItems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity + 1 }
          } else {
            return item
          }
        })
      }
    })
  }

  function decreaseCartQuantity(id: number) {
    setCartItems((currItems) => {
      if (currItems.find((item) => item.id === id)?.quantity === 1) {
        return currItems.filter((item) => item.id !== id)
      } else {
        return currItems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity - 1 }
          } else {
            return item
          }
        })
      }
    })
  }

  function removeFromCart(id: number) {
    setCartItems((currItems) => {
      return currItems.filter((item) => item.id !== id)
    })
  }

  function openCart() {
    setIsOpen(true)
  }

  function closeCart() {
    setIsOpen(false)
  }

  const cartQuantity = cartItems.reduce((total, item) => {
    return total + item.quantity
  }, 0)

  const cartTotalPrice = cartItems.reduce((total, cartItem) => {
    const matchedItemFromStore = storeItems.find((storeItem) => {
      return storeItem.id === cartItem.id
    })

    if (matchedItemFromStore == null) {
      return total
    }

    return total + matchedItemFromStore?.price * cartItem.quantity
  }, 0)

  return (
    <ShoppingCartContext.Provider
      value={{
        getItemQuantity,
        increaseCartQuantity,
        decreaseCartQuantity,
        removeFromCart,
        openCart,
        closeCart,
        cartItems,
        cartQuantity,
        cartTotalPrice,
      }}
    >
      {children}

      {/* This ShoppingCart, by virtue of being on the context of useContext hook, becomes the sibling of root. */}
      <ShoppingCart
        isOpen={isOpen}
        closeCart={closeCart}
        cartItems={cartItems}
        cartTotalPrice={cartTotalPrice}
      />
    </ShoppingCartContext.Provider>
  )
}
