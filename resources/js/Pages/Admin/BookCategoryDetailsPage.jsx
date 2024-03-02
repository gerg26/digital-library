import React from "react";
import AdminPageLayout from "../Layouts/AdminPageLayout";
import { Button, TextField } from "@mui/material";
import Swal from 'sweetalert2'
import withReactContent from "sweetalert2-react-content";
import axios from "axios";

export default function BookCategoryDetailsPage({user}) {
    // gets baseurl
    const baseUrl = import.meta.env.VITE_BASE_URL;

    // handles submit
    const handleSubmit = (ev) => {
        // prevents defualt
        ev.preventDefault();

        // gets form data
        const formData = new FormData(ev.target);

        // init swal
        const MySwal = withReactContent(Swal);

        // shows loading
        MySwal.fire({
            didOpen: () => {
                MySwal.showLoading();
            }  
        })

        // request
        axios.post(`${baseUrl}/api/admin/save-book-category-details`, formData).then((response) => {
            // handles
            if(response.data.status) {
                MySwal.fire({
                    icon:'success',
                    title: "Berhasil",
                    html: response.data.text
                }).then(() => {
                    ev.target.reset();
                })
            }
            else {
                MySwal.fire({
                    icon: 'error',
                    title: 'Gagal',
                    html: response.data.text
                })
            }
        }).catch(ex => {
            MySwal.fire({
                icon:'error',
                title: 'Gagal',
                text: ex
            })
        })

        return false;
    }

    return (
        <AdminPageLayout user={user}>
            <div className="col-start-1 lg:col-start-2">
                <h3 className="font-semibold text-xl">
                    Tambah Kategori
                </h3>
            </div>
            <form onSubmit={handleSubmit} className="mt-5 flex flex-col gap-y-5">
                <TextField name="category-name" label="Nama Kategori" placeholder="Nama Kategori" className="w-fit"/>
                <div className="flex justify-start">
                    <Button variant="contained" type="submit">
                        Simpan
                    </Button>
                </div>
            </form>
        </AdminPageLayout>
    )
}