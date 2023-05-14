import { Outlet, ScrollRestoration } from "react-router-dom";

import Header from "../components/header";
import Footer from "../components/footer";

const Root = () => {
  return (
    <div id="root-component" className="container">
      <Header />

      <main>
        <Outlet />
      </main>

      <Footer author="Marc" location="Le Raacteur" year="2023" />

      <ScrollRestoration />
    </div>
  );
};

export default Root;
