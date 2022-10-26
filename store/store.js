import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import hotelReducer from '../features/hotel/hotelSlice'
import destinationReducer from '../features/destinations/destinationSlice'



export default configureStore({
    reducer: {
        hotels: hotelReducer,
        destinations: destinationReducer
    },
})