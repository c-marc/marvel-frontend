import { useAuth } from "./authProvider";

const Avatar = () => {
  const { user } = useAuth();

  const first = user ? user.account.username[0].toUpperCase() : "#";

  return (
    <div className="avatar">
      <span>{first}</span>
    </div>
  );
};

export default Avatar;
