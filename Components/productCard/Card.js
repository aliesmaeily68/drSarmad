import Link from "next/link";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useContext } from "react";
import { CartContext } from "../../contexts/Cart";

function CardPages(props) {
  const { state, dispatch } = useContext(CartContext);

  const addtoCartHandler=()=>{
    const existinngProduct = state.cart.cartProducts.find(
      (product) => product.slug === props.slug
    );
    const qyt = existinngProduct ? existinngProduct.qyt + 1 : 1;

    dispatch({ type: "ADD_PRODUCT", payload: { ...props, qyt } });
  }
  return (
    <Card>
      <Link href={`/products/${props.slug}`}>
        <Card.Img variant="top" src={props.image} />
      </Link>
      <Card.Body>
        <Link href={`/products/${props.slug}`}>
          <Card.Title>{props.title}</Card.Title>
        </Link>
        <Card.Text>{props.dis}</Card.Text>
        <Button variant="primary" onClick={addtoCartHandler}>اضافه کردن به سبد خرید</Button>
      </Card.Body>
    </Card>
  );
}

export default CardPages;
