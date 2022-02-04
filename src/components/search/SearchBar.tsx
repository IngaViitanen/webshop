import React, { useState } from "react"
import { Products } from "../../models/Products"

const SearchBar = () => {
    const [searchVal, setSearchVal] = useState('')
    

    return (
        <div>
            <input type="text" placeholder="Search..." onChange={(e) => setSearchVal(e.target.value)}/>
        </div>
    )
}

export default SearchBar