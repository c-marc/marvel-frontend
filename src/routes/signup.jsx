import { Form, redirect, useNavigate, useLocation } from "react-router-dom";

export const action =
  ({ handleSignup }) =>
  async ({ request }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);

    handleSignup(data);

    return redirect("/");
  };

export default function Signup() {
  return (
    <>
      <h1>Sign Up</h1>

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
          <span>Username</span>
          <input
            type="text"
            name="username"
            placeholder="Your username"
            defaultValue="nono"
            required
          />
        </label>
        <label>
          <span>Password</span>
          <input
            placeholder="password"
            type="password"
            name="password"
            required
          />
        </label>

        <button type="submit">Sign up</button>
      </Form>
    </>
  );
}
