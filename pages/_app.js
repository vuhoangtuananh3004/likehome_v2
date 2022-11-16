import "../styles/globals.css";
import "../styles/Calendar.css";
import "../styles/DatePicker.css";
import "../styles/Dropdown.css";
import { Provider } from "react-redux";
import store from "../store/store";
import { useEffect } from "react";
function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
