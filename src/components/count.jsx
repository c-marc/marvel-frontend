const Count = ({ count }) => {
  return <p>{`${count} result${count > 1 && "s"}`}</p>;
};

export default Count;
