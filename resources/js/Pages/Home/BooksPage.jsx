import React from "react";
import BookPageLayout from "../Layouts/BookPageLayout";
import SiteTitle from "../../Components/Shared/SiteTitle";
import Books from "../../Components/BookPage/Books";
export default function BooksPage({user, books, keyword}) {
    const baseUrl = import.meta.env.VITE_BASE_URL;

    return <BookPageLayout user={user}>
        <Books searchText={keyword} books={books} className="mt-5 sm:mt-10" baseUrl={`${baseUrl}/book/details`}/>
    </BookPageLayout>
}