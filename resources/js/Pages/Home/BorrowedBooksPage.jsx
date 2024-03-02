import React from "react";
import BookPageLayout from "../Layouts/BookPageLayout";
import Books from "../../Components/BookPage/Books";

export default function BorrowedBooksPage({user, borrowedBooks}) {
    const baseUrl = import.meta.env.VITE_BASE_URL;
    return <BookPageLayout user={user}>
        <h3 className="mb-5 text-2xl font-semibold">Buku Yang Dipinjam</h3>
        <Books books={borrowedBooks}  baseUrl={`${baseUrl}/book/details`}/>
    </BookPageLayout>
}