import React, { useState } from "react";
export default function BookSearchBar({name}) {
    const [text, useText] = useState("");

    // 
    const handleInput = (ev) => {
        const value = ev.target.value;
        useText(value);
    }

    return (
        <input name={name} onInput={handleInput} type="text" className="book-search-bar" placeholder="Search Books" value={text}/>
    );
}