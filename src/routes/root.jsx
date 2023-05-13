import { Outlet } from "react-router-dom";

import Header from "../components/header";
import Footer from "../components/footer";

const Root = () => {
  return (
    <>
      <Header />

      <Outlet />

      <Footer author="Marc" location="Le Réacteur" year="2023" />
    </>
  );
};

export default Root;
