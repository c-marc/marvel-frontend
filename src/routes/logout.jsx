import { useNavigate } from "react-router-dom";
import { useAuth } from "../components/authProvider";

export default function Logout() {
  const { handleLogout } = useAuth();
  const navigate = useNavigate();

  return (
    <p>
      <button onClick={handleLogout}>Yes, I'm sure</button>
      <button
        type="button"
        onClick={() => {
          navigate(-1);
        }}
      >
        Cancel
      </button>
    </p>
  );
}
