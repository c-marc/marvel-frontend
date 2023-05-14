import { Outlet } from "react-router-dom";

import Header from "../components/header";
import Footer from "../components/footer";

const Root = () => {
  return (
    <div id="root-component">
      <Header />

      <main>
        <Outlet />
      </main>

      <Footer author="Marc" location="Le Réacteur" year="2023" />
    </div>
  );
};

export default Root;
