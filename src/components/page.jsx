import { useNavigate } from "react-router-dom";
import { createParams, getPage, getPageMax, getSkip } from "../utils/url";

const Page = ({ route, count, params }) => {
  const navigate = useNavigate();

  const { skip, limit } = params;
  const page = getPage(skip, limit);
  const pageMax = getPageMax(count, limit);

  const handlePageChange = (newPage) => {
    const newSkip = getSkip(newPage, limit);
    const newParams = createParams({ ...params, skip: newSkip });
    const newTo = `${route}?${newParams}`;
    console.log("Navigate to", newTo);
    navigate(newTo);
  };

  return (
    <div className="page">
      {page > 1 && (
        <>
          <button onClick={() => handlePageChange(1)}>1</button>
          <button onClick={() => handlePageChange(page - 1)}>prev</button>
        </>
      )}
      {page}
      {page < pageMax && (
        <>
          <button onClick={() => handlePageChange(page + 1)}>next</button>
          <button onClick={() => handlePageChange(pageMax)}>{pageMax}</button>
        </>
      )}
    </div>
  );
};

export default Page;
