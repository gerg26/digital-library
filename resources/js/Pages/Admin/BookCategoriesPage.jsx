import React from "react";
import AdminPageLayout from "../Layouts/AdminPageLayout";
import Users from "../../Components/AdminPage/Users";
import PrimaryButton from "../../Components/Shared/PrimaryButton";
import BookCategories from "../../Components/AdminPage/BookCategories";
export default function BookCategoriesPage({user, categories}) {
    // gets base url
    const baseUrl = import.meta.env.VITE_BASE_URL;

    return (
        <AdminPageLayout user={user}>
            <div className="flex justify-end mb-5">
                <PrimaryButton link={`${baseUrl}/admin/book-category/details`}>
                    Tambah Kategori
                </PrimaryButton>
                
            </div>
            <BookCategories categories={categories}/>
        </AdminPageLayout>
    )
}