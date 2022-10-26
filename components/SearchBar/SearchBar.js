import React, { useEffect, useState } from "react";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { fetchDestinationId } from "../../features/destinations/destinationSlice";

function SearchBar() {
  const [searchValue, setSearchValue] = useState();
  const destinationIds = useSelector(
    (state) => state.destinations.getDestinations.destinations
  );
  const loadDestinations = useSelector(
    (state) => state.destinations.getDestinations.isLoading
  );
  const dispatch = useDispatch();
  useEffect(() => {
    if (loadDestinations) {
      dispatch(fetchDestinationId());
    } 
  }, [loadDestinations, dispatch]);

const items = []
if (!loadDestinations){
    destinationIds.map (doc => {
        items.push({id: doc.id, name: doc.location_name})
    })
}


  const handleOnSearch = (string, results) => {
    if (results.length > 0) {
      setSearchValue(results[0].id);
    } else {
      setSearchValue(null);
    }
  };
  const handleOnSelect = (item) => {
    setSearchValue(item.id);
  };
  const formatResult = (item) => {
    return (
      <div className="z-20">
        <span style={{ display: "block", textAlign: "left" }}>{item.name}</span>
      </div>
    );
  };
  return (
    <div className="flex flex-row h-full">
      <div className="w-[400px]">
        {!loadDestinations ? (
          <>
            <ReactSearchAutocomplete
              styling={{
                backgroundColor: "rgba(255, 255, 255, 0.8)",
                placeholderColor: "black",
                iconColor: "black",
              }}
              items={items}
              placeholder="Where to go?"
              onSearch={handleOnSearch}
              onSelect={handleOnSelect}
              autoFocus
              formatResult={formatResult}
            />
          </>
        ) : (
          <></>
        )}
      </div>
      <Link href={`hotels/${searchValue}`}>
        <button
          className={`ml-3 h-[44px] w-[50px] bg-white/80 rounded-[24px] disabled ${
            !searchValue ? "invisible" : "visible"
          }`}
        >
          <ArrowForwardRoundedIcon />
        </button>
      </Link>
    </div>
  );
}

export default SearchBar;
