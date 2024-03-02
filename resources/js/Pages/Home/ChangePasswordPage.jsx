import React from "react";
import BookPageLayout from "../Layouts/BookPageLayout";
import { TextField } from "@mui/material";
import PrimaryButton from "../../Components/Shared/PrimaryButton";
import Swal from 'sweetalert2'
import withReactContent from "sweetalert2-react-content";
import axios from "axios";

export default function ChangePasswordPage({user}) {
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
        axios.post(`${baseUrl}/api/user/change-password`, formData).then(response => {
            // handles
            if(response.data.status) {
                MySwal.fire({
                    icon:'success',
                    title: "Berhasil",
                    html: response.data.text
                }).then(_ => {
                    ev.target.reset()
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
    }

    // returns
    return (
        <BookPageLayout user={user}>
            <h3 className="text-2xl font-semibold mb-3">Ganti Password</h3>
            <form className="flex flex-col gap-3 items-start" onSubmit={handleSubmit}>
                <TextField name="current-password" type="password" label="Password Sekarang" placeholder="Password Sekarang"/>
                <TextField name="password" type="password" label="Password Baru" placeholder="Password Baru"/>
                <TextField name="confirm-password" type="password" label="Konfirmasi Password Baru" placeholder="Konfirmasi Password Baru"/>
                <PrimaryButton type="submit">Ubah</PrimaryButton>
            </form>
        </BookPageLayout>
    )
}