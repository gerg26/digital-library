import React, { useLayoutEffect, useState } from "react";
import AdminPageLayout from "../Layouts/AdminPageLayout";
import PrimaryButton from "../../Components/Shared/PrimaryButton";
import BookCover from "../../Components/AdminPage/BookCover";
import { 
    Checkbox,
    FormControlLabel,
    InputLabel,
    TextField, 
    // Checkbox, FormControlLabel, FormGroup, InputLabel 
} from "@mui/material";
import axios from "axios";
import Swal from 'sweetalert2'
import withReactContent from "sweetalert2-react-content";
import { router } from "@inertiajs/react";
export default function BookDetailsPage({user, book, bookCover, categories, selectedCategories}) {
    // gets baseurl
    const baseUrl = import.meta.env.VITE_BASE_URL;

    // gets defaultCheckBoxState
    let defaultCheckBoxState = new Set();
    for(const selectedCategory of selectedCategories) {
        defaultCheckBoxState.add(selectedCategory.KategoriId)
    }

    // use set state
    const [state, setState] = useState({
        Judul: "",
        Penulis: "",
        Sinposis: "",
        Penerbit: "",
        TahunTerbit: "",
    });

    // use checkbox state
    const [checkBoxState, setCheckBoxState] = useState(defaultCheckBoxState)

    // handles text change
    const handleTextChange = (ev, prop) => {
        let newState = {
            ...state,

        }
        newState[prop] = ev.target.value; 
        setState(newState)
    }

    // loads book if book not null
    if(book != null) {
        useLayoutEffect(() => {
            setState(book);
        }, [])
    }

    // handles checkbox chnage
    const handleCheckBoxChange = (ev) => {
        let newCheckBoxState = checkBoxState;

        if(ev.target.checked) {
            newCheckBoxState.add(Number.parseInt(ev.target.value))
        }
        else {
            newCheckBoxState.delete(Number.parseInt(ev.target.value))
        }

        setCheckBoxState(new Set(newCheckBoxState))
    }

    // handles submit
    const handleSubmit = (ev) => {
        // prevents defualt
        ev.preventDefault();

        // gets form data
        const formData = new FormData(ev.target);

        // inserts id if book not null
        if(book != null) {
            formData.set("id", book.BukuId);
        }

        // init swal
        const MySwal = withReactContent(Swal);

        // shows loading
        MySwal.fire({
            didOpen: () => {
                MySwal.showLoading();
            }  
        })

        // request
        axios.post(`${baseUrl}/api/admin/save-book-details`, formData).then((response) => {
            // handles
            if(response.data.status) {
                MySwal.fire({
                    icon:'success',
                    title: "Berhasil",
                    html: response.data.text
                }).then(() => {
                    if(response.data.id != null) {
                        router.visit(`${baseUrl}/admin/book/details/${response.data.id}`);
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

        return false;

        
    }

    // returns
    return (
        <AdminPageLayout user={user}>
            <div className="grid grid-cols-1 lg:grid-cols-4">
                <div className="col-start-1 lg:col-start-2">
                    <h3 className="font-semibold text-xl">
                        {
                            book == null ? "Tambah Buku" : "Ubah Buku"
                        }
                    </h3>
                </div>
            </div>
            <form onSubmit={handleSubmit} className="mt-5 grid grid-cols-1 lg:grid-cols-4 gap-5">
                <div className="">
                    <div className="max-h-96 aspect-[2/3]">
                        <BookCover update={book?.updated_at} image={bookCover} name="book-cover"/>
                    </div>
                </div>
                <div className="col-span-1 lg:col-span-3">
                    <div className="space-y-4">
                        <TextField onChange={(ev) => handleTextChange(ev, "Judul")} name="book-name" label="Nama Buku" placeholder="Nama Buku" className="w-full" value={state.Judul}/>
                        <TextField onChange={(ev) => handleTextChange(ev, "Penulis")} name="author" label="Penulis" placeholder="Penulis" className="w-full" value={state?.Penulis}/>
                        <TextField onChange={(ev) => handleTextChange(ev, "Sinopsis")} name="synopsis" label="Sinopsis" placeholder="Sinopsis" className="w-full" value={state?.Sinopsis} InputProps={{
                            rows: 7,
                            multiline: true,
                            inputComponent: 'textarea'
                        }}/>
                        <TextField onChange={(ev) => handleTextChange(ev, "Penerbit")} name="publisher" label="Penerbit" placeholder="Penerbit" className="w-full" value={state?.Penerbit}/>
                        <TextField onChange={(ev) => handleTextChange(ev, "TahunTerbit")} name="publication-year" label="Tahun Terbit" placeholder="Tahun Terbit" className="w-full" value={state?.TahunTerbit}/>
                        <InputLabel>Kategori</InputLabel>
                        <div className="grid grid-cols-4">
                            {
                                categories.map((item) => {
                                    return <FormControlLabel 
                                        key={item.KategoriId} 
                                        name="categories[]" 
                                        value={item.KategoriId} 
                                        checked={checkBoxState.has(item.KategoriId)}
                                        onChange={handleCheckBoxChange}
                                        control={<Checkbox  />} 
                                        label={item.NamaKategori} 
                                    />
                                })
                            }
                        </div>
                    </div>
                    <div className="mt-5 flex justify-start">
                        <PrimaryButton type="submit">
                            {
                                book == null ? "Tambahkan Buku" : "Ubah Buku"
                            }
                        </PrimaryButton>
                    </div>
                </div>
            </form>
        </AdminPageLayout>
    )
}