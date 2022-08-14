import thunk from "redux-thunk";
import { Provider } from "react-redux";
import ReactDOM from "react-dom/client";
import { applyMiddleware, createStore } from "redux";

// Style
import "./index.css";
import "./styles/buttons.scss";
import "bootstrap/dist/css/bootstrap.min.css";

// Moduls
import reducers from "./reducers";
// const App = lazy(() => import("./App"));
import App from "./App";

let store = createStore(reducers, applyMiddleware(thunk));

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <Provider store={store}>
    {/* <div> */}
    {/* <Suspense fallback={<h1>Loading..</h1>}>
      </Suspense> */}
    <App />
    {/* </div> */}
  </Provider>
  // </React.StrictMode>
);
