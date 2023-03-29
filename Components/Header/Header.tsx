import React, { useContext, useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Link from "next/link";
import { CartContext } from "../../contexts/Cart";

function Header() {
  const { state, dispatch } = useContext(CartContext);
  const { cart } = state;
  const { cartProducts } = cart;
  const [cartCounter, setCartCounter] = useState(0);
  useEffect(() => {
    setCartCounter(
      cartProducts.reduce((acc: any, cur: any) => acc + cur.qyt, 0)
    );
  }, [state]);
  return (
    <Navbar bg="primary" expand="lg" variant="primary">
      <Container>
        <nav className="text-white d-flex justify-content-around w-100 flex-row-reverse">
          <div>آیکون</div>
          <div>
            <ul className="d-flex flex-gap-3 flex-row-reverse ">
              <Link href="/">
                <li>خانه</li>
              </Link>
              <Link href="/about">
                <li>درباره ما</li>
              </Link>
            </ul>
          </div>
          <div>
            <ul className="d-flex flex-gap-3">
              <Link href="/login">
                <li>ورود</li>
              </Link>
              <Link href="/cart">
                <li>سبد خرید</li>
                <span>{cartCounter}</span>
              </Link>
            </ul>
          </div>
        </nav>
      </Container>
    </Navbar>
  );
}

export default Header;
