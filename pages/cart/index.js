import React from "react";
import Table from "react-bootstrap/Table";
import { useContext } from "react";
import { CartContext } from "../../contexts/Cart";
import Layout from "../../Components/Layout/Layout";
import { Container } from "react-bootstrap";
import dynamic from "next/dynamic";
import Link from "next/link";

function CartPage() {
  const { state, dispatch } = useContext(CartContext);
  const { cart } = state;
  const { cartProducts } = cart;

  const removeHandler = (id) => {
    dispatch({
      type: "REMOVE_PRODUCT",
      productSlug: id,
    });
  };
  return (
    <Layout headTitle="سبد خرید">
      <Container>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>عنوان</th>
              <th>مبلغ محصول</th>
              <th>تعداد محصول</th>
              <th>جمع مبلغ محصول</th>
              <th>حذف محصول </th>
            </tr>
          </thead>
          <tbody>
            {cartProducts.map((product) => (
              <tr key={product.slug}>
                <td>{product.title}</td>
                <td>{product.qyt}</td>
                <td>{product.price}</td>
                <td>{product.price * product.qyt}</td>
                <td>
                  <button
                    className="bg-danger text-white p-2"
                    onClick={() => removeHandler(product.slug)}
                  >
                    حذف محصول
                  </button>
                </td>
              </tr>
            ))}

            <tr>
              <td colSpan={3} className="text-center">
                جمع کل مبلغ محصولات:
                {"     "}
                {cartProducts.reduce(
                  (Acc, curr) => Acc + curr.qyt * curr.price,
                  0
                )}
              </td>
              <td className="text-center" colSpan={3}>
                <Link href="/checkouts">
                  <button className="bg-primary rounded border-0 text-white px-4 py-1">
                    پرداخت
                  </button>
                </Link>
              </td>
            </tr>
          </tbody>
        </Table>
      </Container>
    </Layout>
  );
}

export default dynamic(() => Promise.resolve(CartPage));
