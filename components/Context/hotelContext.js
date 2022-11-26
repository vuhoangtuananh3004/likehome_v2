import { createContext, useState} from 'react';

export const HotelContext = createContext({
    setCurrentHotel: ({}) => null,
    currentHotel: null,
  });
  
  export const HotelProvider = ({ children }) => {
    const [currentHotel, setCurrentHotel] = useState({});
    const value = { currentHotel, setCurrentHotel };
  
    return <HotelContext.Provider value={value}>{children}</HotelContext.Provider>;
  }