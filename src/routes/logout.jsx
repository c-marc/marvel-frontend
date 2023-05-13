import { useNavigate } from "react-router-dom";
import { useAuth } from "../components/authProvider";

export default function Logout() {
  const { handleLogout } = useAuth();
  const navigate = useNavigate();

  return (
    <p>
      <button
        onClick={() => {
          handleLogout();
          navigate("/");
        }}
      >
        Yes, I'm sure
      </button>
      <button
        type="button"
        onClick={() => {
          navigate(-1);
        }}
      >
        No, I'm an addict to Compound V...
      </button>
    </p>
  );
}
