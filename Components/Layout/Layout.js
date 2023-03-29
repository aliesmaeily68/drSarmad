import React from "react";
import Head from "next/head";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

function Layout({ headTitle, headDis, children }) {
  return (
    <>
      <Head>
        <title>فروشگاه -{headTitle}</title>
        <meta name="description" content={headDis} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="d-flex flex-column justify-content-between  h-100 ">
        <header>
          <Header />
        </header>
        <main>{children}</main>
        <footer>
          <Footer />
        </footer>
      </div>
    </>
  );
}

export default Layout;
