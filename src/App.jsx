import "./App.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Root from "./routes/root";
import ErrorPage from "./components/error-page";
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
import Favorites, {
  loader as favoritesLoader,
  action as favoritesAction,
} from "./routes/favorites";
import Signup, { action as signupAction } from "./routes/signup";
import Login, { action as loginAction } from "./routes/login";
import Logout from "./routes/logout";
import ProtectedRoute from "./routes/protectedRoute";
import { useAuth } from "./components/authProvider";

function App() {
  const { user, handleSignup, handleLogin } = useAuth();
  const token = user?.token;
  console.log(token);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      errorElement: <ErrorPage />,
      children: [
        { index: true, element: <Index /> },
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
        {
          path: "comics",
          element: <Comics />,
          loader: comicsLoader(token),
          action: comicsAction,
        },
        {
          path: "comics/:characterId",
          element: <ComicsWith />,
          loader: comicsWithLoader(token),
          action: comicsWithAction,
        },
        {
          path: "comic/:comicId",
          element: <Comic />,
          loader: comicLoader(token),
          action: comicAction,
        },
        {
          path: "characters",
          element: <Characters />,
          loader: charactersLoader(token),
          action: charactersAction,
        },
        {
          path: "character/:characterId",
          element: <Character />,
          loader: characterLoader(token),
          action: characterAction,
        },
        {
          // pathless protectect route
          element: <ProtectedRoute />,
          errorElement: <div>Oops! There was an error.</div>,
          children: [
            {
              path: "favorites",
              element: <Favorites />,
              loader: favoritesLoader(token),
              action: favoritesAction,
            },
          ],
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
