import { useEffect } from "react";
import Layout from "../Components/Layout/Layout";
import Products from "../Components/Products/Products";
export default function Home() {
  return (
    <>
      <Layout headTitle="خانه" headDis="لوازم بهداشتی">
        <Products />
      </Layout>
    </>
  );
}
