import { Link } from "react-router-dom";
import Avatar from "./avatar";
import Navigation from "./navigation";

import logo from "../assets/Logo-Marvel-BW.png";
//import logo from "../assets/MarvelLogo.png";

export default function Header() {
  return (
    <header>
      <Link to="/">
        <img src={logo} alt="logo Marel" />
      </Link>

      <Navigation />

      <Avatar />
    </header>
  );
}
