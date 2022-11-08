import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import { parse } from "postcss";
import db from "../../firebaseConfig";
import {
  getPropertiesByDestinationId,
  checkAvailable,
} from "../../firebaseFunction";

export const fetchHotelsByDestinationId = createAsyncThunk(
  "/hotels/destinationID/hotelList",
  async (routerVariable) => {
    const {id, checkIn, checkOut} = routerVariable
    const data = await getPropertiesByDestinationId(id).then(
      (data) => data.listHotels
    );  
    // let hotelIds = [];
    // for (const item of data) {
    //   hotelIds.push(item.id);
    // }
    // let temp = checkIn.split("-");
    // let [monthIn, dayIn, yearIn] = [
    //   parseInt(temp[0]),
    //   parseInt(temp[1]),
    //   parseInt(temp[2]),
    // ];
    // temp = checkOut.split("-");
    // let [monthOut, dayOut, yearOut] = [
    //   parseInt(temp[0]),
    //   parseInt(temp[1]),
    //   parseInt(temp[2]),
    // ];

    console.log("work");
    // for (const id of hotelIds) {
    //   const data = await checkAvailable(id);
    //   let isAvailable = true;
    //   data = data.filter((m) => {
    //     if (yearIn == yearOut)
    //       return m.month >= monthIn && m.month <= monthOut;
    //     return !(m.month < monthIn && m.month > monthOut);
    //   });

    //   for (let i = 0; i <  bookingAvailable.length; i++) {
    //     for (let j = dayIn - 1; j < dayOut; j++) {
    //       if (! bookingAvailable[i].days[j].available) {
    //         isAvailable = false;
    //         break;
    //       }
    //     }
    //     if (!isAvailable) {
    //       console.log(id);
    //       break
    //     }
    //   }
    // }   
    // console.log(data = data.filter(t => t.id != "20419179"));


    
    return {data: [...data]};
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
  removeId: [],

  reducers: {
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
      const copyFilter = filter;
      const searchFilter = state.searchBoxFilter;

      const potay = (searchFilter) => {
        if (searchFilter.checkIn || searchFilter.checkOut) {
          let temp = searchFilter.checkIn.split("-");
          let [monthIn, dayIn, yearIn] = [
            parseInt(temp[0]),
            parseInt(temp[1]),
            parseInt(temp[2]),
          ];
          temp = searchFilter.checkOut.split("-");
          let [monthOut, dayOut, yearOut] = [
            parseInt(temp[0]),
            parseInt(temp[1]),
            parseInt(temp[2]),
          ];
  
          const run = async () => {
            let hotelIds = [];
            for (const item of copyFilter) {
              hotelIds.push(item.id);
            }
  
            for (const id of hotelIds) {
              const data = await checkAvailable(id);
              let isAvailable = true;
              data = data.filter((m) => {
                if (yearIn == yearOut)
                  return m.month >= monthIn && m.month <= monthOut;
                return !(m.month < monthIn && m.month > monthOut);
              });
  
              for (let i = 0; i < data.length; i++) {
                for (let j = dayIn - 1; j < dayOut; j++) {
                  if (!data[i].days[j].available) {
                    isAvailable = false;
                    break;
                  }
                }
                if (!isAvailable) {
                  filter = filter.filter((t) => t.id != id);
                  return filter
                }
              }
            }       
          }
          return run()
        }
      }
      // (async()=> {
      //   console.log(await potay(searchFilter));
      // })()
      action.payload.map((doc) => {
        switch (doc.name) {
          case "PRICE":
            if (doc.value != undefined) {
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
        state.getHotelByDestinationId.isLoading = false;
        state.filterHotels = action.payload.data;
        state.getHotelByDestinationId.hotels = action.payload.data;
      });
  },
});

// Action creators are generated for each case reducer function
export const {
  copyListHotels,
  filter,
  reloadGetHotelByDestinationId,
  searchBoxFilterValue,
} = hotelSlice.actions;

export default hotelSlice.reducer;

const priceConvert = (priceTemp) => {
  let temp = priceTemp.split("$");
  return parseFloat(temp[1]);
};
