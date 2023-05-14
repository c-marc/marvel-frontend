import { useNavigate } from "react-router-dom";
import { useAuth } from "../components/authProvider";

export default function Logout() {
  const { handleLogout } = useAuth();
  const navigate = useNavigate();

  return (
    <div id="logout">
      <button
        className="btn btn-primary"
        onClick={() => {
          handleLogout();
          navigate("/");
        }}
      >
        Yes, I'm sure
      </button>
      <button
        className="btn"
        type="button"
        onClick={() => {
          navigate(-1);
        }}
      >
        No, I'm an addict to Compound V...
      </button>
    </div>
  );
}
