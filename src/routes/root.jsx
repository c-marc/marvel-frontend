import { Outlet } from "react-router-dom";

import Header from "../components/header";

const Root = () => {
  return (
    <>
      <Header />

      <h1>Root page</h1>

      <Outlet />
    </>
  );
};

export default Root;
