import { Button, TextField } from "@mui/material";
import Swal from 'sweetalert2'
import withReactContent from "sweetalert2-react-content";
import axios from "axios";
import React from "react";
export default function ReviewForm({bookId, onSubmitSuccess}) {
    const handleSubmit = (ev) => {
        ev.preventDefault();

        // gets baseurl
        const baseUrl = import.meta.env.VITE_BASE_URL;

        // init swal
        const MySwal = withReactContent(Swal);

        // shows loading
        MySwal.fire({
            didOpen: () => {
                MySwal.showLoading();
            }  
        })
        
        // gets formdata
        const formData = new FormData(ev.target);

        // adds bookid
        if(bookId != null) {
            formData.set('book-id', bookId);
        }

        // req
        axios.post(`${baseUrl}/api/book/submit-review`, formData).then(response => {
            // handles
            if(response.data.status) {
                MySwal.fire({
                    icon:'success',
                    title: "Berhasil",
                    html: response.data.text
                }).then(() => {
                    if(response.data?.review != null) {
                        onSubmitSuccess(response.data.review)
                    }
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
    
    return (
        <form className="w-full flex flex-col" onSubmit={handleSubmit}>
            <p className="text-xl mb-1">Buat Review Anda</p>
            <TextField name="review" multiline={true} rows={4} className="w-full md:w-[70%]" placeholder="Buku ini sangat bagus..."/>
            <div className="flex justify-start mt-3">
                <Button type="submit" variant="contained" sx={{
                    backgroundColor: "purple",
                    ':hover': {
                        backgroundColor: "#BF40BF"
                    }
                }}>
                    Submit
                </Button>
            </div>
        </form>
    )
}