import "./App.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Root from "./routes/root";
import ErrorPage from "./error-page";
import Index from "./routes";
import Comics, {
  loader as comicsLoader,
  action as comicsAction,
} from "./routes/comics";
import Comic, {
  loader as comicLoader,
  action as comicAction,
} from "./routes/comic";
import ComicsWith, {
  loader as comicsWithLoader,
  action as comicsWithAction,
} from "./routes/comicsWith";
import Characters, {
  loader as charactersLoader,
  action as charactersAction,
} from "./routes/characters";
import Character, {
  loader as characterLoader,
  action as characterAction,
} from "./routes/character";
import Signup, { action as signupAction } from "./routes/signup";
import Login, { action as loginAction } from "./routes/login";
import Logout from "./routes/logout";
import ProtectedRoute from "./routes/protectedRoute";
import { useAuth } from "./components/authProvider";

function App() {
  const { handleSignup, handleLogin } = useAuth();

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      errorElement: <ErrorPage />,
      children: [
        { index: true, element: <Index /> },
        {
          // pathless protectect route
          element: <ProtectedRoute />,
          errorElement: <div>Oops! There was an error.</div>,
          children: [
            {
              path: "comics",
              element: <Comics />,
              loader: comicsLoader,
              action: comicsAction,
            },
            {
              path: "comics/:characterId",
              element: <ComicsWith />,
              loader: comicsWithLoader,
              action: comicsWithAction,
            },
            {
              path: "comic/:comicId",
              element: <Comic />,
              loader: comicLoader,
              action: comicAction,
            },
            {
              path: "characters",
              element: <Characters />,
              loader: charactersLoader,
              action: charactersAction,
            },
            {
              path: "character/:characterId",
              element: <Character />,
              loader: characterLoader,
              action: characterAction,
            },
          ],
        },

        {
          path: "signup",
          element: <Signup />,
          action: signupAction({ handleSignup }),
        },
        {
          path: "login",
          element: <Login />,
          action: loginAction({ handleLogin }),
        },
        {
          path: "logout",
          element: <Logout />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
