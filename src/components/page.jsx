import { useSubmit } from "react-router-dom";
import { getPage, getPageMax, getSkip } from "../utils/url";

import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";

const Page = ({ count, params }) => {
  const submit = useSubmit();

  // try to useLoaderData for that pattern
  const { skip, limit, title, name } = params;
  const page = getPage(skip, limit);
  const pageMax = getPageMax(count, limit);

  const handlePageChange = (newPage) => {
    const newSkip = getSkip(newPage, limit);

    // Submit to current route (as GET)
    let formData = new FormData();
    formData.append("skip", newSkip);
    formData.append("limit", limit);
    title && formData.append("title", title);
    name && formData.append("name", name);
    submit(formData);
  };

  // shorteners
  // out of bounds values shouldnt happen but let's be safe
  const isPageOne = page <= 1;
  const isPageMax = page >= pageMax;

  return (
    <div className="page">
      <div className={isPageOne ? "isHidden" : ""}>
        <button disabled={isPageOne} onClick={() => handlePageChange(1)}>
          1
        </button>
        <button
          disabled={isPageOne}
          onClick={() => handlePageChange(page - 1)}
          aria-label="previous page"
        >
          <ChevronLeftIcon className="icon" />
        </button>
      </div>
      <p>{page}</p>
      <div className={isPageMax ? "isHidden" : ""}>
        <button
          disabled={isPageMax}
          onClick={() => handlePageChange(page + 1)}
          aria-label="next-page"
        >
          <ChevronRightIcon className="icon" />
        </button>
        <button disabled={isPageMax} onClick={() => handlePageChange(pageMax)}>
          {pageMax}
        </button>
      </div>
    </div>
  );
};

export default Page;
