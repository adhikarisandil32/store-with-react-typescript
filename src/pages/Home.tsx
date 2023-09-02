import { Link } from "react-router-dom"

export default function Home() {
  return (
    <h1>
      Go to <Link to="/store">Store</Link>
    </h1>
  )
}
