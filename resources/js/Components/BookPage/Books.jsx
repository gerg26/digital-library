import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import Book from "./Book";
import { Button, InputAdornment, TextField } from "@mui/material";
import PrimaryButton from "../Shared/PrimaryButton";
export default function Books({books, searchText, baseUrl, className}) {
    // use searchedBooks
    const [searchedBooks, setSearchedBooks] = useState(books);

    // uses search input text
    const [searchInputText, useSearchInputText] = useState(searchText ?? "");

    // search book
    const searchBooks = ({keyword}) => {
        // if search keyword is empty, reset and aborts
        if(keyword == '') {
            // set searched bokos to defaults
            setSearchedBooks(books);

            // returns
            return;
        }

        // temporary books array
        let tempBooks = [];

        // foreach through books
        for(const book of books) {
            // if keyword is in judul or penulis or sinopsis, adds to temp books
            if(
                book.Judul.toLowerCase().includes(keyword.toLowerCase()) ||
                book.Penulis.toLowerCase().includes(keyword.toLowerCase()) ||
                book.Sinopsis.toLowerCase().includes(keyword.toLowerCase())
            ){
                tempBooks.push(book)
            }
        }

        // set searched books
        setSearchedBooks(tempBooks);
    }

    // handles search click
    const handleSearch = (ev) => {
        // prevents default
        ev.preventDefault();

        // gest search keyword
        /** @type {String} */
        const searchKeyword = new FormData(ev.target).get('search-keyword').toLowerCase();

        // search books
        searchBooks({
            keyword: searchKeyword
        })
        
        // returns false
        return false;
    }

    // if searchText is not null, search books
    if(searchText != null) {
        useEffect(() => {
            searchBooks({keyword: searchText});
        }, [])
    }

    // returns
    return (
        <div className="">
            <form className="mt-10 mb-5 flex flex-col sm:flex-row gap-2" onSubmit={handleSearch}>
                <TextField
                    onChange={ev => {useSearchInputText(ev.target.value)}}
                    value={searchInputText}
                    name="search-keyword"
                    className="w-full"
                    label="Temukan Buku"
                    placeholder="Temukan Buku"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <svg className="w-6 h-6 text-black" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"/>
                                </svg>
                            </InputAdornment>
                        )
                    }}
                />
                <Button 
                    variant="contained" 
                    type="submit"
                    style={{
                        backgroundColor: '#27007D'
                    }
                }>
                    <svg className="w-6 h-6 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"/>
                    </svg>
                </Button>
            </form>
            <div className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-10 ${className}`}>
                {
                    searchedBooks.map(book => {
                        return (
                            <Book book={book} key={book.BukuId} link={`${baseUrl}/${book.BukuId}`}/>
                        )
                    })
                }
                {
                    books.length == 0 ? 
                        <p>Sedang kosong...</p>
                    : <></>
                }
            </div>
        </div>
    )
}