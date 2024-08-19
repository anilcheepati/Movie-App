import React, { useState } from 'react'
import "./SearchArea.css"

const SearchArea = ({handleSearch}) => {
    const [search,setSearch]=useState("")

    function handleButtonSearch(){
        handleSearch(search)
    }

    function handleKeyPress(event) {
        if (event.key === 'Enter') {
            handleButtonSearch()
        }
    }

  return (
    <div className="search-container">
        <input 
        onChange={(event)=>setSearch(event.target.value)}
        onKeyDown={handleKeyPress}
        type="text" 
        placeholder="Search Movie Name" 
        id="search-input" 
        value={search}
        
        />
        <button onClick={handleButtonSearch} id="search-button">🔍</button>
    </div>
  )
}

export default SearchArea