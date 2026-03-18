import * as serviceWorker from "./serviceWorker";
import { Container, createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";
import { router } from "./router";
import { Provider } from "react-redux";
import store from "store/redux-store";

const root = createRoot(document.getElementById("root") as Container);

root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>,
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
