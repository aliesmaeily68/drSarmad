import React from "react";
import Card from "../productCard/Card";
import { Container, Row, Col } from "react-bootstrap";
import { useGetFetch } from "../../CustomHook/useFetch";

function Products() {
  const [products] = useGetFetch("api/products");
  return (
    <div>
      <Container>
        <Row>
          {products &&
            products.map((product) => (
              <Col
                key={product.id}
                className="col-sm-12 col-md-6 col-lg-4 col-xl-3 mb-2"
              >
                <Card {...product} />
              </Col>
            ))}
        </Row>
      </Container>
    </div>
  );
}

export default Products;
