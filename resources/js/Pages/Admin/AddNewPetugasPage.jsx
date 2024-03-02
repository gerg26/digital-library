import React from "react";
import AdminPageLayout from "../Layouts/AdminPageLayout";
import { TextField } from "@mui/material";
import PrimaryButton from "../../Components/Shared/PrimaryButton";
import Swal from 'sweetalert2'
import withReactContent from "sweetalert2-react-content";
import axios from "axios";

export default function AddNewPetugasPage({user}) {
    // gets baseurl
    const baseUrl = import.meta.env.VITE_BASE_URL;

    // handles save
    const handleSave = (ev) => {
        // 
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
        axios.post(`${baseUrl}/api/admin/petugas/add`, formData).then(response => {
            // handles
            if(response.data.status) {
                MySwal.fire({
                    icon:'success',
                    title: "Berhasil",
                    html: response.data.text
                }).then(() => {
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

        // 
        return false;
    }

    return <AdminPageLayout user={user}>
        <div>
            <h3 className="text-xl font-semibold mb-3">Tambah Petugas Baru</h3>
            <form className="flex flex-col gap-5" onSubmit={handleSave}>
                <div className="space-x-5">
                    <TextField name="username" label="Username" placeholder="Username"/>
                    <TextField name="password" type="password" label="Password" placeholder="Password"/>
                </div>
                <div className="flex justify-start">
                    <PrimaryButton type="submit">
                        Simpan
                    </PrimaryButton>
                </div>
            </form>
        </div>
    </AdminPageLayout>
}