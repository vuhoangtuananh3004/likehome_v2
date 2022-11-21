import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import hotelReducer from '../features/hotel/hotelSlice'
import destinationReducer from '../features/destinations/destinationSlice'
import accountReducer from '../features/account/accountSlice'
import bookingReducer from '../features/hotel/bookingSlice'


export default configureStore({
    reducer: {
        hotels: hotelReducer,
        destinations: destinationReducer,
        account: accountReducer,
        booking: bookingReducer
    },
})