import { Col, Row } from "react-bootstrap"
import StoreItem from "../components/StoreItem"
import storeItems from "../data/data.json"

function Store() {
  return (
    <>
      <h1>Store</h1>
      <Row xs={1} md={2} lg={4} className="g-3">
        {storeItems.map((storeItem) => {
          return (
            <Col key={storeItem.id}>
              <StoreItem {...storeItem}></StoreItem>
            </Col>
          )
        })}
      </Row>
    </>
  )
}

export default Store
