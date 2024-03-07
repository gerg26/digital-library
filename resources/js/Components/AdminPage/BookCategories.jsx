import React from "react";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
export default function BookCategories({ categories }) {
    //
    let i = 0;

    // gets base url
    const baseUrl = import.meta.env.VITE_BASE_URL;

    // handles delete click
    const handleDeleteClick = (KategoriID, NamaKategori) => {
        // init swal
        const MySwal = withReactContent(Swal);

        // shows confirmation
        MySwal.fire({
            icon: "warning",
            title: "Peringatan",
            text: `Anda yakin ingin menghapus kategori ini; "${NamaKategori}"`,
            showConfirmButton: true,
            showCancelButton: true,
            confirmButtonText: "Ya",
            cancelButtonText: "Tidak",
        }).then((result) => {
            if (result.isConfirmed) {
                axios
                    .get(`${baseUrl}/api/admin/category/delete/${KategoriID}`)
                    .then((response) => {
                        // handles
                        if (response.data.status) {
                            MySwal.fire({
                                icon: "success",
                                title: "Berhasil",
                                html: response.data.text,
                            }).then((_) => {
                                router.reload();
                            });
                        } else {
                            MySwal.fire({
                                icon: "error",
                                title: "Gagal",
                                html: response.data.text,
                            });
                        }
                    })
                    .catch((ex) => {
                        MySwal.fire({
                            icon: "error",
                            title: "Gagal",
                            text: ex,
                        });
                    });
            }
        });
    };

    return (
        <div className="overflow-x-scroll w-full">
            <table className="min-w-[200px] w-full">
                <thead className="">
                    <tr className="">
                        <th>No</th>
                        <th>Nama</th>
                        <th>Hapus</th>
                    </tr>
                </thead>
                <tbody>
                    {categories.map((category) => {
                        return (
                            <tr key={category.KategoriId}>
                                <td>{++i}</td>
                                <td>{category.NamaKategori}</td>
                                <td>
                                    <button
                                        type="button"
                                        onClick={(ev) =>
                                            handleDeleteClick(
                                                category.KategoriId,
                                                category.NamaKategori
                                            )
                                        }
                                    >
                                        <svg
                                            className="w-7 h-7 text-red-500"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                stroke="currentColor"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"
                                            />
                                        </svg>
                                    </button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}
