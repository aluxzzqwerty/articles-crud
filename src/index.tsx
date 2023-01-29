import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import App from "./components/App";
import { store } from "./app/store";
import './scss/main.css';

const container = document.getElementById("root")!;
const root = createRoot(container);

root.render(
    <Provider store={store}>
      <App />
    </Provider>
);
