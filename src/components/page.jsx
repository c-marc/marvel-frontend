import { useSubmit } from "react-router-dom";
import { getPage, getPageMax, getSkip } from "../utils/url";

const Page = ({ count, params }) => {
  const submit = useSubmit();

  const { skip, limit, title, name } = params;
  const page = getPage(skip, limit);
  const pageMax = getPageMax(count, limit);

  const handlePageChange = (newPage) => {
    const newSkip = getSkip(newPage, limit);

    // Submit to current route
    let formData = new FormData();
    formData.append("skip", newSkip);
    formData.append("limit", limit);
    title && formData.append("title", title);
    name && formData.append("name", name);
    submit(formData);
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
