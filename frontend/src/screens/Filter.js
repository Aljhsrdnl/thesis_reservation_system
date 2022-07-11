import React from 'react'
import { useState } from "react";

function Filter(){
    // const[categories] = useState();
    const[items, setItems] = useState([]);
    const[search, setSearch] = useState("");
    return(
        <div className="filter_menu">
            <div className = "row">
                <span>Filter:</span>
                <select name="category">
                    <option value=''>All Items</option>
=                   <option value='Equipment'>Equipment</option>
                    <option value='Apparatus'>Apparatus</option> 

                </select>
            </div>
            
        </div>
    )
}

export default Filter;