import { NavLink, Link } from "react-router-dom";
import { useAuth } from "./authProvider";

export default function Navigation() {
  const { user } = useAuth();

  return (
    <nav>
      <section>
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
      </section>
      <section>
        {user ? (
          <Link to="/logout">Log Out</Link>
        ) : (
          <section>
            <Link to="/signup">Sign Up</Link>
            <Link to="/login">Log In</Link>
          </section>
        )}
      </section>
    </nav>
  );
}
