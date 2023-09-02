import React from "react"
import Card from "react-bootstrap/Card"
import Button from "react-bootstrap/Button"
import { formatCurrency } from "../utilities/currencyFormatter"
import { useShoppingCart } from "../context/ShoppingCartContext"

type StoreItemProps = {
  id: number
  name: string
  price: number
  imgUrl: string
}

export default function StoreItem({ id, name, price, imgUrl }: StoreItemProps) {
  const {
    getItemQuantity,
    increaseCartQuantity,
    decreaseCartQuantity,
    removeFromCart,
  } = useShoppingCart()

  const quantity = getItemQuantity(id)

  return (
    <Card className="h-100">
      <Card.Img
        variant="top"
        src={imgUrl}
        height="200px"
        style={{
          objectFit: "cover",
          objectPosition: "top",
        }}
      />
      <Card.Body>
        <Card.Title className="d-flex justify-content-between align-items-baseline">
          <span className="fs-5">{name}</span>
          <span className="fs-6 text-muted">{formatCurrency(price)}</span>
        </Card.Title>
        {quantity === 0 ? (
          <Button
            className="w-100"
            onClick={() => {
              increaseCartQuantity(id)
            }}
          >
            + Add to Cart
          </Button>
        ) : (
          <div className="d-flex flex-column align-items-center gap-2">
            <div className="d-flex align-items-baseline">
              <Button
                onClick={() => {
                  decreaseCartQuantity(id)
                }}
              >
                -
              </Button>
              <span className="px-2">
                <span className="fs-4 fw-bold">{quantity}</span> in Cart
              </span>
              <Button
                onClick={() => {
                  increaseCartQuantity(id)
                }}
              >
                +
              </Button>
            </div>
            <div>
              <Button
                variant="danger"
                onClick={() => {
                  removeFromCart(id)
                }}
              >
                Remove
              </Button>
            </div>
          </div>
        )}
      </Card.Body>
    </Card>
  )
}
