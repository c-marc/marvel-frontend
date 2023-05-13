import { NavLink, Link } from "react-router-dom";
import { useAuth } from "./authProvider";

export default function Navigation() {
  const { user } = useAuth();

  return (
    <nav>
      <NavLink
        to={`comics`}
        className={({ isActive, isPending }) =>
          isActive ? "active" : isPending ? "pending" : ""
        }
      >
        Comics
      </NavLink>
      <NavLink
        to={`characters`}
        className={({ isActive, isPending }) =>
          isActive ? "active" : isPending ? "pending" : ""
        }
      >
        Characters
      </NavLink>
      <NavLink
        to="/favorites"
        className={({ isActive, isPending }) =>
          isActive ? "active" : isPending ? "pending" : ""
        }
      >
        Favorites
      </NavLink>
      {user ? (
        <Link to="/logout">Log Out</Link>
      ) : (
        <div>
          <Link to="/signup">Sign Up</Link>
          <Link to="/login">Log In</Link>
        </div>
      )}
    </nav>
  );
}
