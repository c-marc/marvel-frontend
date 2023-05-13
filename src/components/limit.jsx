import { Form, useSubmit } from "react-router-dom";

const Limit = ({ params }) => {
  const submit = useSubmit();

  const { skip, limit, name, title } = params;
  return (
    <Form id="limit-form">
      <select
        name="limit"
        id="limit"
        defaultValue={limit}
        onChange={(event) => {
          submit(event.currentTarget.form, { replace: true });
        }}
      >
        <option value="10">10</option>
        <option value="50">50</option>
        <option value="100">100</option>
      </select>

      <input hidden readOnly name="skip" value={skip} />
      {name && <input hidden readOnly name="name" value={name} />}
      {title && <input hidden readOnly name="title" value={title} />}
    </Form>
  );
};

export default Limit;
