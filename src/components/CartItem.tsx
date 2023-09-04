import { Button } from "react-bootstrap"
import { formatCurrency } from "../utilities/currencyFormatter"
import { useShoppingCart } from "../context/ShoppingCartContext"
import storeItems from "../data/data.json"

type CartItemProps = {
  individualCartItem: {
    id: number
    quantity: number
  }
}

export default function CartItem({ individualCartItem }: CartItemProps) {
  const { removeFromCart } = useShoppingCart()
  return (
    <>
      {storeItems.map((item) => {
        if (item.id === individualCartItem.id) {
          return (
            <div key={item.id} className="d-flex align-items-center gap-2">
              <div className="position-relative">
                <img
                  src={item.imgUrl}
                  style={{
                    height: "75px",
                    width: "100px",
                    objectFit: "cover",
                    objectPosition: "top",
                  }}
                />
                <Button
                  className="d-flex fs-4 align-items-center justify-content-center top-0 position-absolute bg-danger border-0 rounded-0"
                  style={{
                    height: "20px",
                    width: "20px",
                  }}
                  onClick={() => {
                    removeFromCart(item.id)
                  }}
                >
                  &times;
                </Button>
              </div>

              {/* Name, Price, Quantity and Total of Individual Item */}
              <div style={{ width: "150px" }}>
                <div className="d-flex justify-content-between">
                  <span
                    className="text-truncate d-block"
                    style={{ width: "130px" }}
                  >
                    {item.name}
                  </span>
                  <span className="text-muted d-block">
                    &nbsp;&nbsp;&times;{individualCartItem.quantity}
                  </span>
                </div>
                <div>{formatCurrency(item.price)}</div>
              </div>

              {/* Total amount of total items */}
              <div className="ms-auto">
                {formatCurrency(item.price * individualCartItem.quantity)}
              </div>
            </div>
          )
        }
      })}
    </>
  )
}
