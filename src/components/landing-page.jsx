import { Link } from "react-router-dom";
import { useAuth } from "./authProvider";

export default function LandingPage() {
  const { user } = useAuth();

  return (
    <div id="landing-page">
      {user ? (
        <>
          <h1>
            Welcome back{" "}
            <span className="bold username">{user.account.username}</span>!
          </h1>
          <p>
            Did you miss us? Or are you in an urgent need of checking{" "}
            <Link to="/favorites">your favorites</Link>?
          </p>
          <p>
            Otherwise, have fun exploring{" "}
            <Link to="/comics">more Marvel's comics</Link>.
          </p>
        </>
      ) : (
        <>
          <h1>Welcome!</h1>
          <p>
            Do we know each other? <Link to="/login">Log in!</Link>
          </p>
          <p>
            You're a stranger? <Link to="/signup">Sign up</Link> and you'll be
            able to choose and track your favorite Comics and Characters!
          </p>
          <p>
            Or just wander around and learn about{" "}
            <Link to="/comics">comics</Link> and{" "}
            <Link to="/characters">characters</Link>!
          </p>
        </>
      )}
    </div>
  );
}
