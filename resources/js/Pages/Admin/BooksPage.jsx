import React from "react";
import BookPageLayout from "../Layouts/BookPageLayout";
import SiteTitle from "../../Components/Shared/SiteTitle";
import Books from "../../Components/BookPage/Books";
import AdminPageLayout from "../Layouts/AdminPageLayout";
import PrimaryButton from "../../Components/Shared/PrimaryButton";
export default function BooksPage({user, books}) {
    // gets base url
    const baseUrl = import.meta.env.VITE_BASE_URL;

    return <AdminPageLayout user={user}>
        <div className="flex justify-end mb-5">
            <PrimaryButton link={`${baseUrl}/admin/book/details`}>
                Tambah Buku
            </PrimaryButton>
        </div>
        <Books books={books} className="mt-5 sm:mt-10" baseUrl={`${baseUrl}/admin/book/details`}/>
    </AdminPageLayout>
}