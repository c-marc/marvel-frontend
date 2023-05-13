import { useAuth } from "./authProvider";

const Avatar = () => {
  const { user } = useAuth();

  if (!user) return null;

  const first = user.account.username[0].toUpperCase();

  return (
    <div className="avatar">
      <span>{first}</span>
    </div>
  );
};

export default Avatar;
