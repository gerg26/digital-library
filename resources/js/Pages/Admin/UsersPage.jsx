import React from "react";
import AdminPageLayout from "../Layouts/AdminPageLayout";
import Users from "../../Components/AdminPage/Users";
import PrimaryButton from "../../Components/Shared/PrimaryButton";
export default function UsersPage({user, users}) {
    // gets base url
    const baseUrl = import.meta.env.VITE_BASE_URL;

    return (
        <AdminPageLayout user={user}>
            <div className="flex justify-end mb-5">
                {
                    user != null && user.Tipe == "Admin" ? 
                        <PrimaryButton link={`${baseUrl}/admin/add-new-petugas`}>
                            Tambah Petugas
                        </PrimaryButton>
                    : <></>
                }
                
            </div>
            <Users users={users}/>
        </AdminPageLayout>
    )
}