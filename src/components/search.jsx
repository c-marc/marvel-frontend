import { Form, useSubmit } from "react-router-dom";

const Search = ({ params, searching }) => {
  const submit = useSubmit();

  const { title, name, limit } = params;

  // Are we searching for comics or characters?
  // Be careful, title/name can be ""
  const label = title !== undefined ? "title" : "name";
  const value = title !== undefined ? title : name;

  console.log("title", title);
  console.log(label);

  return (
    <Form id="search-form" role="search">
      <input
        id={label}
        className={searching ? "loading" : ""}
        aria-label={`Search ${label}`}
        placeholder="Search"
        type="search"
        name={label}
        defaultValue={value}
        onChange={(event) => {
          // replace the current entry in the history stack with the next page
          const isFirstSearch = value === "";
          submit(event.currentTarget.form, {
            replace: !isFirstSearch,
          });
        }}
      />

      {/* submit limit but let skip go to default */}
      <input name="limit" value={limit} aria-hidden hidden={true} />

      {/* pattern from doc: use it */}
      <div id="search-spinner" aria-hidden hidden={true} />
      <div className="sr-only" aria-live="polite"></div>
    </Form>
  );
};

export default Search;
