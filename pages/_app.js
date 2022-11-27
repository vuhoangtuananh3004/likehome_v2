import "../styles/globals.css";
import "../styles/Calendar.css";
import "../styles/DatePicker.css";
import "../styles/Dropdown.css";
import { Provider } from "react-redux";
import store from "../store/store";
import { useEffect } from "react";
import { HotelProvider } from "../components/Context/hotelContext";
import { getCurrentUser } from "../firebaseFunction";

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    getCurrentUser().then((user) => console.log(user));
  });
  return (
    <Provider store={store}>
      <HotelProvider>
        <Component {...pageProps} />
      </HotelProvider>
    </Provider>
  );
}

export default MyApp;
