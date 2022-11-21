import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import { parse } from "postcss";
import db from "../../firebaseConfig";
import {
  getPropertiesByDestinationId,
  checkAvailable,
} from "../../firebaseFunction";

export const fetchHotelsByDestinationId = createAsyncThunk(
  "/hotels/destinationID/hotelList",
  async (id) => {
    const data = await getPropertiesByDestinationId(id).then(
      (data) => data.listHotels
    );  
    return [...data];
  }
);

const initialState = {
  getHotelByDestinationId: {
    hotels: [],
    isLoading: true,
  },
  searchBoxFilter: {
    checkIn: null,
    checkOut: null,
    adults: null,
  },
};

export const hotelSlice = createSlice({
  name: "hotels",
  initialState,
  filterHotels: [],
  reducers: {
    fetchHotelByDestID: (state, action) => {
      state.getHotelByDestinationId.hotels = action.payload;
      state.filterHotels = action.payload
      state.getHotelByDestinationId.isLoading = false;
    },
    copyListHotels: (state, action) => {
      if (action.payload) {
        state.filterHotels = action.payload;
      }
    },
    reloadGetHotelByDestinationId: (state, action) => {
      state.getHotelByDestinationId.isLoading =
        !state.getHotelByDestinationId.isLoading;

      state.searchBoxFilter.checkIn = null;

      state.searchBoxFilter.checkOut = null;
      state.searchBoxFilter.adults = null;
    },
    searchBoxFilterValue: (state, action) => {
      const objectValue = {
        checkIn: action.payload.checkIn,
        checkOut: action.payload.checkOut,
        adults: action.payload.adults,
      };
      return {
        ...state,
        searchBoxFilter: objectValue,
      };
    },
    filter: (state, action) => {
      const filter = state.getHotelByDestinationId.hotels;
      action.payload.map((doc) => {
        switch (doc.name) {
          case "PRICE":
            if (doc.value != undefined) {
          
              if (doc.value != 300)
              filter = filter.filter((t) => priceConvert(t.price) <= doc.value);
            }
            if (doc.sortType != undefined) {
              if (doc.sortType == "INCREASE") {
                filter = filter.sort(
                  (a, b) => priceConvert(a.price) - priceConvert(b.price)
                );
              }
              if (doc.sortType == "DECREASE") {
                filter = filter.sort(
                  (a, b) => priceConvert(b.price) - priceConvert(a.price)
                );
              }
            }
            break;
          case "RATING":
            if (doc.value != undefined) {
              filter = filter.filter((t) => t.starRating <= doc.value);
            }
            if (doc.sortType != undefined) {
              if (doc.sortType == "INCREASE") {
                filter = filter.sort((a, b) => a.starRating - b.starRating);
              }
              if (doc.sortType == "DECREASE") {
                filter = filter.sort((a, b) => b.starRating - a.starRating);
              }
            }
            break;
          case "AMENITIES":
            if (doc.value.length > 0) {
              doc.value.map((data) => {
                if (data) {
                  filter = filter.filter((t) =>
                    t.listingPreviewAmenityNames.includes(data)
                  );
                }
              });
            }

            break;
          default:
            break;
        }
      });
      return {
        ...state,
        filterHotels: filter,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchHotelsByDestinationId.pending, (state, action) => {
        state.getHotelByDestinationId.isLoading = true;
      })
      .addCase(fetchHotelsByDestinationId.fulfilled, (state, action) => {
        state.filterHotels = action.payload;
        state.getHotelByDestinationId.hotels = action.payload;
        state.getHotelByDestinationId.isLoading = false;    
      });
  },
});

// Action creators are generated for each case reducer function
export const {
  copyListHotels,
  filter,
  reloadGetHotelByDestinationId,
  searchBoxFilterValue,
  fetchHotelByDestID
} = hotelSlice.actions;

export default hotelSlice.reducer;

const priceConvert = (priceTemp) => {
  let temp = priceTemp.split("$");
  return parseFloat(temp[1]);
};
