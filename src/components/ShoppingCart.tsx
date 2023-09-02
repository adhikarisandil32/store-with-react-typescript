import Offcanvas from "react-bootstrap/Offcanvas"
import Stack from "react-bootstrap/Stack"
import CartItemComponent from "./CartItem"
import { formatCurrency } from "../utilities/currencyFormatter"

type CartItem = {
  id: number
  quantity: number
}

type ShoppingCartProps = {
  isOpen: boolean
  closeCart: () => void
  cartItems: CartItem[]
  cartTotalPrice: number
}

export default function ShoppingCart({
  isOpen,
  closeCart,
  cartItems,
  cartTotalPrice,
}: ShoppingCartProps) {
  return (
    <>
      <Offcanvas show={isOpen} placement="end" onHide={closeCart}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Shopping Cart</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Stack gap={3}>
            {cartItems.map((item) => {
              return (
                <CartItemComponent key={item.id} individualCartItem={item} />
              )
            })}
          </Stack>
        </Offcanvas.Body>
        <div className="p-4 fs-5 fw-bold ms-auto">
          Total: {formatCurrency(cartTotalPrice)}
        </div>
      </Offcanvas>
    </>
  )
}
