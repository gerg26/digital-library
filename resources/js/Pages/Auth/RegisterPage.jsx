import React from "react";
import AuthPageLayout from "../Layouts/AuthPageLayout";
import SiteTitle from "../../Components/Shared/SiteTitle";
import AuthTextInput from "../../Components/AuthPage/AuthTextInput";
import AuthPasswordInput from "../../Components/AuthPage/AuthPasswordInput";
import PrimaryButton from "../../Components/Shared/PrimaryButton";
import { Link } from "@inertiajs/react";
import axios from "axios";
import Swal from 'sweetalert2'
import withReactContent from "sweetalert2-react-content";

export default function RegisterPage() {
    // handles form submit
    const handleSubmit = async function(ev) {
        // prevent defaults
        ev.preventDefault();

        // gets form data
        var formData = new FormData(ev.target)

        // init swal
        const MySwal = withReactContent(Swal);

        // shows loading
        MySwal.fire({
            didOpen: () => {
                MySwal.showLoading();
            }  
        })

        // request
        const baseUrl = import.meta.env.VITE_BASE_URL;
        axios.post(`${baseUrl}/api/auth/sign-up`, formData)
        .then((response) => {
            // handles success
            if(response.data.status) {   
                MySwal.fire({
                    icon: 'success',
                    title: 'Berhasil',
                    html: response.data.text
                }).then(() => {
                    // reset forms
                    ev.target.reset();
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
    }

    // returns
    return <AuthPageLayout>
        <SiteTitle/>
        <form className="mt-3 space-y-3" onSubmit={handleSubmit}>
            <AuthTextInput name="username" text="Username"/>
            <AuthTextInput name="fullname" text="Fullname"/>
            <AuthTextInput name="email" text="Email"/>
            <AuthPasswordInput name="password" text="Password"/>
            <AuthPasswordInput name="confirm-password" text="Confirm Password"/>
            <div className="mt-3">
                <p className="text-white text-center small-text">Sudah punya akun? <Link replace href="sign-in"><span className="link">Masuk</span></Link></p>
            </div>
            <div className="flex justify-center">
                <PrimaryButton type="submit" style={{
                    width: '200px'
                }} text="Sign Up"/>
            </div>
        </form>
    </AuthPageLayout>
}