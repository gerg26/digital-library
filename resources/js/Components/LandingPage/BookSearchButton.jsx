import React from "react"
import SearchIcon from "../../../images/search.svg"
export default function BookSearchButton({onClick, type}) {
    return (
        <button type={type}>
            <div className="book-search-button" onClick={onClick}>
                <img src={SearchIcon}/>
            </div>
        </button>
    )
}