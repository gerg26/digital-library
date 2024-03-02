import React from "react";
export default function BorrowedBooks({borrowedBooks}) {
    // 
    let i = 0;

    return (
        <div className="overflow-x-scroll w-full">
            <table className="min-w-[200px] w-full">
                <thead className="">
                    <tr className="">
                        <th>No</th>
                        <th>Buku</th>
                        <th>Peminjam</th>
                        <th>Tanggal Peminjaman</th>
                        <th>Tanggal Pengembalian</th>
                        <th>Status Pinjaman</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        borrowedBooks.map(borrowedBooks => {
                            return (
                                <tr key={borrowedBooks.PeminjamanId}>
                                    <td>{++i}</td>
                                    <td>{borrowedBooks.book.Judul}</td>
                                    <td>{borrowedBooks.borrower.NamaLengkap}</td>
                                    <td>{borrowedBooks.TanggalPeminjaman}</td>
                                    <td>{borrowedBooks.TanggalPengembalian}</td>
                                    <td>{borrowedBooks.StatusPeminjaman}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}