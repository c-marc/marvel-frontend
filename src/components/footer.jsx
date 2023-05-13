import { HeartIcon } from "@heroicons/react/24/solid";

const Footer = ({ author, location, year }) => {
  return (
    <footer>
      <p>
        Made with <HeartIcon className="icon" /> by{" "}
        <span className="bold">{author}</span> at{" "}
        <span className="bold">{location}</span> - {year}
      </p>
    </footer>
  );
};

export default Footer;
