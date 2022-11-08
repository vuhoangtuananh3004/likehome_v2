import React, { useState } from "react";
import { ReactSearchAutocomplete } from "react-search-autocomplete";

export default function SearchAutoComplete() {
    const [searchValue, setSearchValue] = useState()
    const items = [
        {
            id: 0,
            name: 'Cobol'
        },
        {
            id: 1,
            name: 'JavaScript'
        },
        {
            id: 2,
            name: 'Basic'
        },
        {
            id: 3,
            name: 'PHP'
        },
        {
            id: 4,
            name: 'Java'
        },
    ]
    const handleOnSearch = (string, results) => { 
        if (results.length > 0) {
            setSearchValue(results[0].name)
        }else{
            setSearchValue(null)
        }
    }
    const handleOnSelect = (item) => {
        setSearchValue(item.name)
    }
    const formatResult = (item) => {
        return (
            <div className='z-20'>
                <span style={{ display: 'block', textAlign: 'left' }}>{item.name}</span>
            </div>
        )
    }
  return (
    <ReactSearchAutocomplete
      styling={{
        backgroundColor: "white",
        placeholderColor: "black",
        iconColor: "black",
        borderRadius: "none",
        height: "44px",
        border: "none",
      }}
      items={items}
      placeholder="Where to go?"
      onSearch={handleOnSearch}
      onSelect={handleOnSelect}
      autoFocus
      formatResult={formatResult}
    />
  );
}
