import React, { useState } from "react";
import BookPageLayout from "../Layouts/BookPageLayout";
import PosterImage from "../../../images/poster-2.jpg"
import PrimaryButton from "../../Components/Shared/PrimaryButton";
import Swal from 'sweetalert2'
import withReactContent from "sweetalert2-react-content";
import axios from "axios";
import ReviewForm from "../../Components/BookPage/ReviewForm";
import Reviews from "../../Components/BookPage/Reviews";

export default function BookDetailPage({user, book, borrow, reviews}) {    
    // use state isBorrowed
    const [isBorrowed, setIsBorrowed] = useState(borrow != null);

    // 
    const [currentReviews, setCurrentReviews] = useState(reviews)

    // handles borrow book
    const handleBorrowBook = () => {
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

        // request
        axios.get(`${baseUrl}/api/book/borrow-book/${book.BukuId}`, {
            headers: {
                Accept: 'application/json'
            }
        }).then(response => {
            // handles
            if(response.data.status) {
                MySwal.fire({
                    icon:'success',
                    title: "Berhasil",
                    html: response.data.text
                }).then(() => {
                    setIsBorrowed(true)
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

    // handle return book
    const handleReturnBook = async () => {
        // gets baseurl
        const baseUrl = import.meta.env.VITE_BASE_URL;

        // init swal
        const MySwal = withReactContent(Swal);

        // shows modal
        const modalResult = await MySwal.fire({
            icon: 'warning',
            title: 'Peringatan',
            text: 'Yakin ingin mengembalikan buku?',
            showCancelButton: true,
            confirmButtonText: 'Ya',
            cancelButtonText: 'Tidak'
        })

        // 
        if(!modalResult.isConfirmed) {
            return;
        }

        // request
        axios.get(`${baseUrl}/api/book/return-book/${book.BukuId}`, {
            headers: {
                Accept: 'application/json'
            }
        }).then(response => {
            // handles
            if(response.data.status) {
                MySwal.fire({
                    icon:'success',
                    title: "Berhasil",
                    html: response.data.text
                }).then(() => {
                    setIsBorrowed(false);
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

    // 
    const handleReviewSubmitSuccess = (review) => {
        
    }

    // returns
    return (
        <BookPageLayout user={user}>
            <div>
                <div className="flex flex-col sm:flex-row gap-5 sm:gap-8 mt-5">
                    <div className="basis-[50px] grow flex justify-center">
                        <img src={`${book.cover}?update=${book.updated_at}`} className=""/>
                    </div>
                    <div className="basis-[200px] grow-[3]">
                        <h4 className="text-[#818181] text-lg font-light">{book.Penulis }</h4>
                        <h3 className="text-2xl text-black font-light">{book.Judul}</h3>
                        <h5 className="mt-4 text-lg">Deskripsi</h5>
                        <p className="mt-3 font-light">{book.Sinopsis}</p>
                        <div className="mt-3">
                            <h5 className="mt-4 text-lg">Detail Buku</h5>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                {/* <div>
                                    <h6 className="text-[#464646]">Jumlah Halaman</h6>
                                    <p className="text-[#6A6A6A]">1854</p>
                                </div> */}
                                <div>
                                    <h6 className="text-[#464646]">Tahun Terbit</h6>
                                    <p className="text-[#6A6A6A]">{book.TahunTerbit}</p>
                                </div>
                                {/* <div>
                                    <h6 className="text-[#464646]">Bahasa</h6>
                                    <p className="text-[#6A6A6A]">Inggris</p>
                                </div> */}
                                <div>
                                    <h6 className="text-[#464646]">Penerbit</h6>
                                    <p className="text-[#6A6A6A]">{book.Penerbit}</p>
                                </div>
                                {/* <div>
                                    <h6 className="text-[#464646]">Kategori</h6>
                                    <p className="text-[#6A6A6A]">Fiksi</p>
                                </div> */}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex justify-center mt-5">
                    {
                        isBorrowed ?
                            <PrimaryButton className={"!bg-purple-800"} onClick={handleReturnBook} text="Kembalikan Buku"/>
                        :
                            <PrimaryButton onClick={handleBorrowBook} text="Pinjam Buku"/>
                    }
                </div>
            </div>
            <div className="mt-5">
                <h2 className="text-3xl font-semibold mb-3">Review</h2>
                <div className="my-5">
                    <Reviews reviews={currentReviews}/>
                </div>
                <ReviewForm onSubmitSuccess={handleReviewSubmitSuccess} bookId={book?.BukuId}/>
            </div>
        </BookPageLayout>
    );
}