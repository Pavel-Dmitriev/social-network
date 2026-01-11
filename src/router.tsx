import { lazy, Suspense } from "react";
import { createBrowserRouter, Navigate, useLocation } from "react-router";
import { Provider } from "react-redux";
import store from "store/redux-store";
// import { withSuspense } from "./hoc/withSuspense";
import App from "./App";
import RootErrorBoundary from "./components/RootErrorBoundary";
import ErrorPage from "./components/ErrorPage";
import { Preloader } from "./components/common/Preloader";

const Profile = lazy(() => import("./components/Profile"));
const DialogsContainer = lazy(
  () => import("./components/Dialogs/DialogsContainer")
);
const UsersContainer = lazy(() => import("./components/Users/UsersContainer"));
const Login = lazy(() => import("./components/Login"));

// Data loaders for different routes
const profileLoader = async ({ params, request }) => {
  const userId = params.userId || "me";

  // Fetch user profile data
  const response = await fetch(`/api/profile/${userId}`);
  if (!response.ok) {
    throw new Response("User not found", { status: 404 });
  }

  const userProfile = await response.json();

  // Dispatch Redux actions for data management
  store.dispatch({ type: "SET_USER_PROFILE", payload: userProfile });
  store.dispatch({ type: "SET_USER_STATUS", payload: "loaded" });

  return { userProfile, userId };
};

const usersLoader = async ({ request }) => {
  const url = new URL(request.url);
  const page = url.searchParams.get("page") || 1;
  const count = url.searchParams.get("count") || 10;

  const response = await fetch(`/api/users?page=${page}&count=${count}`);
  if (!response.ok) {
    throw new Response("Failed to load users", { status: 500 });
  }

  const usersData = await response.json();

  // Store in Redux
  store.dispatch({ type: "SET_USERS", payload: usersData.items });
  store.dispatch({
    type: "SET_USERS_TOTAL_COUNT",
    payload: usersData.totalCount,
  });
  store.dispatch({ type: "SET_CURRENT_PAGE", payload: page });

  return { usersData, currentPage: page };
};

const dialogsLoader = async ({ params }) => {
  const userId = params.userId;

  if (!userId) {
    // Load all dialogs
    const response = await fetch("/api/dialogs");
    const dialogs = await response.json();

    store.dispatch({ type: "SET_DIALOGS", payload: dialogs });
    return { dialogs };
  } else {
    // Load specific dialog messages
    const response = await fetch(`/api/dialogs/${userId}/messages`);
    const messages = await response.json();

    store.dispatch({ type: "SET_MESSAGES", payload: messages });
    store.dispatch({ type: "SET_CURRENT_DIALOG_USER_ID", payload: userId });

    return { messages, userId };
  }
};

const authLoader = async () => {
  // Check authentication status
  const response = await fetch("/api/auth/me");
  console.log("🚀 ~ response:", response);

  if (response.ok) {
    const userData = await response.json();
    store.dispatch({ type: "SET_AUTH_USER_DATA", payload: userData });
    return { isAuth: true, userData };
  } else {
    store.dispatch({ type: "SET_AUTH_USER_DATA", payload: null });
    return { isAuth: false, userData: null };
  }
};

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/profile" replace />,
  },
  {
    path: "/",
    element: (
      <Provider store={store}>
        <App />
      </Provider>
    ),
    errorElement: <RootErrorBoundary />,
    children: [
      {
        path: "/profile/:userId?",
        element: (
          <Suspense fallback={<Preloader />}>
            <Profile />
          </Suspense>
        ),
        // loader: profileLoader,
        // errorElement: (
        //   <div>
        //     <h2>Failed to load profile</h2>
        //     <p>Please try again later</p>
        //   </div>
        // ),
      },
      {
        path: "/users",
        element: (
          <Suspense fallback={<Preloader />}>
            <UsersContainer />
          </Suspense>
        ),
        // loader: usersLoader,
        errorElement: (
          <div>
            <h2>Failed to load users</h2>
            <p>Please check your connection</p>
          </div>
        ),
      },
      {
        path: "/dialogs/:userId?",
        element: (
          <Suspense fallback={<Preloader />}>
            <DialogsContainer />
          </Suspense>
        ),
        // loader: dialogsLoader,
        errorElement: (
          <div>
            <h2>Failed to load messages</h2>
            <p>Please try again</p>
          </div>
        ),
      },
      {
        path: "/login",
        element: (
          <Suspense fallback={<Preloader />}>
            <Login />
          </Suspense>
        ),
        // loader: authLoader,
        // errorElement: (
        //   <div>
        //     <h2>Failed to load login page</h2>
        //     <p>Authentication service unavailable</p>
        //   </div>
        // ),
      },
      // {
      //   path: "/news",
      //   element: (
      //     <div>
      //       <h1>News</h1>
      //       <p>Coming soon...</p>
      //     </div>
      //   ),
      //   loader: async () => {
      //     // News loader
      //     return { message: "News page" };
      //   },
      // },
      // {
      //   path: "/music",
      //   element: (
      //     <div>
      //       <h1>Music</h1>
      //       <p>Coming soon...</p>
      //     </div>
      //   ),
      //   loader: async () => {
      //     // Music loader
      //     return { message: "Music page" };
      //   },
      // },
      // {
      //   path: "/settings",
      //   element: (
      //     <div>
      //       <h1>Settings</h1>
      //       <p>Coming soon...</p>
      //     </div>
      //   ),
      //   loader: async () => {
      //     // Settings loader
      //     return { message: "Settings page" };
      //   },
      // },
      {
        path: "*",
        element: <ErrorPage />,
        loader: async () => {
          throw new Response("Not Found", { status: 404 });
        },
      },
    ],
  },
]);

// Router configuration with middleware
// export const routerWithMiddleware = createBrowserRouter(
//   [
//     {
//       path: "/",
//       element: <Navigate to="/profile" replace />,
//     },
//     {
//       path: "/",
//       element: <AppWrapper />,
//       loader: async () => {
//         // App-level initialization
//         await store.dispatch({ type: "APP_INITIALIZE" });
//         return null;
//       },
//       errorElement: <RootErrorBoundary />,
//       children: [
//         // ... all routes
//       ],
//     },
//   ],
//   {
//     future: {
//       v7_routeConvention: true,
//     },
//   }
// );

// Default router export
export default router;
