import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useGetFetch } from "../../CustomHook/useFetch";
import { Container, Row, Col } from "react-bootstrap";
import Layout from "../../Components/Layout/Layout";
import Image from "next/image";
import { useContext } from "react";
import { CartContext } from "../../contexts/Cart";

function MainProduct() {
  const { state, dispatch } = useContext(CartContext);
  const [products] = useGetFetch("/api/products");
  const { query } = useRouter();
  const [mainProduct, setMainProduct] = useState();
  const { pid } = query;
  useEffect(() => {
    if (products) {
      const mainProduct = products.find((product) => product.slug === pid);
      setMainProduct(mainProduct);
    }
  }, [products]);

  const addProductToCartHandler = () => {
    const existinngProduct = state.cart.cartProducts.find(
      (product) => product.slug === mainProduct.slug
    );
    const qyt = existinngProduct ? existinngProduct.qyt + 1 : 1;

    dispatch({ type: "ADD_PRODUCT", payload: { ...mainProduct, qyt } });
  };

  const increiseProductHandler = () => {
    const existinngProduct = state.cart.cartProducts.find(
      (product) => product.slug === mainProduct.slug
    );

    if (existinngProduct) {
      existinngProduct.qyt += 1;
    }

    dispatch({
      type: "INCRIES_PRODUCT",
      increiseProduct: { existinngProduct },
    });
  };
  const decreiseProductHandler = () => {
    const existinngProduct = state.cart.cartProducts.find(
      (product) => product.slug === mainProduct.slug
    );
    if (existinngProduct) {
      if (existinngProduct.qyt > 1) {
        existinngProduct.qyt -= 1;
      }
    }

    dispatch({
      type: "DECRIES_PRODUCT",
      decreiseProduct: { existinngProduct },
    });
  };

  return (
    <>
      {mainProduct && (
        <Layout
          headTitle={mainProduct.title}
          headDis=" ali dvhjkhvs sddiojusvd"
        >
          <div>
            <Container>
              <Row className="py-3">
                <Col className="col-sm-9">
                  <div className="mt-3 px-4  text-start">
                    <h2>
                      <span className="ml-2">عنوان محصول :</span>
                      {mainProduct.title}
                    </h2>
                    <p>{mainProduct.dis}</p>
                  </div>
                  <div className="mt-3 px-3 text-start">
                    <p>
                      <span className="px-2">موجودی :</span>
                      {mainProduct.count > 0 ? (
                        <span className="text-success">موجود</span>
                      ) : (
                        <span className="text-danger">ناموجود</span>
                      )}
                    </p>
                    <p>{mainProduct.price}</p>
                    <p>{mainProduct.cat}</p>
                    <button
                      className="bg-info rounded p-1"
                      onClick={addProductToCartHandler}
                    >
                      اضافه کردن به سبد خرید
                    </button>
                    <button
                      className="bg-info rounded p-1"
                      onClick={increiseProductHandler}
                    >
                      +
                    </button>

                    <span></span>
                    <button
                      className="bg-info rounded p-1"
                      onClick={decreiseProductHandler}
                    >
                      -
                    </button>
                  </div>
                </Col>
                <Col className="col-sm-3">
                  <Image
                    src={mainProduct.image}
                    width={50}
                    height={50}
                    layout="responsive"
                  />
                </Col>
              </Row>
            </Container>
          </div>
        </Layout>
      )}
    </>
  );
}

export default MainProduct;
