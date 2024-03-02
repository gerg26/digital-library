import React from "react";
import AuthPageLayout from "../Layouts/AuthPageLayout";
import SiteTitle from "../../Components/Shared/SiteTitle";
import AuthTextInput from "../../Components/AuthPage/AuthTextInput";
import AuthPasswordInput from "../../Components/AuthPage/AuthPasswordInput";
import PrimaryButton from "../../Components/Shared/PrimaryButton";
import { Link } from "@inertiajs/react";
import Swal from 'sweetalert2'
import withReactContent from "sweetalert2-react-content";
import axios from "axios";

export default function LoginPage() {
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

        // gets baseurl
        const baseUrl = import.meta.env.VITE_BASE_URL;

        // csrf request
        axios.get(`${baseUrl}/sanctum/csrf-cookie`).then(response => {
            // login request
            axios.post(`${baseUrl}/api/auth/sign-in`, formData)
            .then((response) => {
                // handles success
                if(response.data.status) {   
                    MySwal.fire({
                        icon: 'success',
                        title: 'Berhasil',
                        html: response.data.text,
                        timer: 2000,
                        timerProgressBar: true
                    }).then(() => {
                        window.location.href = `${baseUrl}/book/list`;
                    })
                }
                // handles fails
                else {
                    MySwal.fire({
                        icon: 'error',
                        title: 'Gagal',
                        html: response.data.text
                    })
                }
            })
            .catch(ex => {
                // handles error
                MySwal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: ex
                })
            });
        });
    }

    // returns
    return <AuthPageLayout>
        <div style={{
            width: '100%',
        }}>
            <SiteTitle/>
        </div>
        <form className="mt-3 space-y-3" onSubmit={handleSubmit}>
            <AuthTextInput name="username-or-email" text="Username Atau Email"/>
            <AuthPasswordInput name="password" text="Password"/>
            <div className="mt-3">
                <p className="text-white text-center small-text">Belum punya akun? <Link replace href="sign-up"><span className="link">Daftar</span></Link></p>
            </div>
            <div className="flex justify-center">
                <PrimaryButton type="submit" style={{
                    width: '200px'
                }} text="Sign In"/>
            </div>
        </form>
    </AuthPageLayout>
}