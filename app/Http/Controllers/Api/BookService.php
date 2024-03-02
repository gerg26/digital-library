<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Buku;
use App\Models\Peminjaman;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class BookService extends Controller
{
    public function borrowBook($bookId) {
        // gets book
        $book = Buku::where('BukuId', $bookId)->first();

        // ensure book exists
        if(empty($book)) {
            return response()->json([
                "status"  => false,
                "text" => "Buku tidak ada!"
            ]);
        }

        // gets existing borrows by user id and book id
        $existingBorrow = Peminjaman::where('UserId', Auth::user()->UserId)
            ->where('BukuId', $bookId)
            ->where('StatusPeminjaman', 'Diterima')
            ->first();

        // aborts if exist
        if(!empty($existingBorrow)) {
            return response()->json([
                "status" => false,
                "text" => "Buku sudah dipinjam!"
            ]);
        }

        // borrows
        $borrowResult = (new Peminjaman([
            "UserId" => Auth::user()->UserId,
            "BukuId" => $bookId,
            "TanggalPeminjaman" => Carbon::now(),
            "TanggalPengembalian" => Carbon::now()->addDay(7),
            "StatusPeminjaman" => "Diterima"
        ]))->save();

        // returns
        if($borrowResult) {
            return response()->json([
                "status" => true,
                "text" => "Berhasil meminjam!"
            ]);
        }
        else {
            return response()->json([
                "status" => false,
                "text" => "Gagal meminjam; sesuatu terjadi!"
            ]);
        }

    }

    public function returnBook($bookId) {
        // gets book
        $book = Buku::where('BukuId', $bookId)->first();

        // ensure book exists
        if(empty($book)) {
            return response()->json([
                "status"  => false,
                "text" => "Buku tidak ada!"
            ]);
        }

        // gets existing borrows by user id and book id
        $existingBorrow = Peminjaman::where('UserId', Auth::user()->UserId)
            ->where('BukuId', $bookId)
            ->where('StatusPeminjaman', 'Diterima')
            ->first();

        // ensure existing borrows exist
        if(empty($existingBorrow)) {
            return response()->json([
                "status"  => false,
                "text" => "Peminjaman tidak ada!"
            ]);
        }

        // returns the book
        $existingBorrow->StatusPeminjaman = 'Dikembalikan';
        $existingBorrow->TanggalPeminjaman = Carbon::now();
        $existingBorrow->save();

        // returns the response
        return response()->json([
            'status' => true,
            'text' => 'Berhasil mengembalikan buku!'
        ]);
    }
}
