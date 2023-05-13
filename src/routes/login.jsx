import { Form, redirect } from "react-router-dom";

export const action =
  ({ handleLogin }) =>
  async ({ request }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);

    handleLogin(data);

    return redirect("/");
  };

export default function Login() {
  return (
    <>
      <h1>Log In</h1>

      <Form method="post">
        <label>
          <span>Email</span>
          <input
            type="email"
            name="email"
            placeholder="nono@reacteur.io"
            defaultValue="nono@reacteur.io"
            required
          />
        </label>
        <label>
          <span>Password</span>
          <input
            type="password"
            name="password"
            placeholder="password"
            required
          />
        </label>

        <button type="submit">Log In</button>
      </Form>
    </>
  );
}
