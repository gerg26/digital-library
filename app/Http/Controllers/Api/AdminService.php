<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\AddNewPetugasRequest;
use App\Http\Requests\SaveBookCategoryDetailsRequest;
use App\Http\Requests\SaveBookDetailsRequest;
use App\Models\Buku;
use App\Models\KategoriBuku;
use App\Models\KategoriBukuReleasi;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;

class AdminService extends Controller
{
    public function saveBookDetails(SaveBookDetailsRequest $request) {
        // create new book if id null
        if(empty($request["id"])) {
            // ensure book cover exists
            if(empty($request["book-cover"])) {
                return response()->json([
                    "status" => false,
                    "text" => "Cover buku harus ada!"
                ]);
            }

            // creates
            $book = new Buku();
        }
        // otherwise gets book
        else {
            // gets book
            $book = Buku::where('BukuId', $request["id"])->first();

            // ensure book exists
            if(empty($book)) {
                return response()->json([
                    "status" => false,
                    "text" => "Buku tidak ditermukan!"
                ]);
            }

            // if book-cover exists, deletes existing photo
            if(!empty($request['book-cover'])) {
                // gets files
                $files = Storage::disk('public')->files();

                // foreach files
                foreach($files as $file) {
                    // gets filename without format
                    $fileName = $file;
                    $explode = explode("/", $fileName);
                    $explode = end($explode);
                    $explode = explode('.', $explode);
                    $fileNameWithoutFormat = $explode[0];

                    // if filename without format equals with id, deletes
                    if($fileNameWithoutFormat == $book->BukuId) {
                        Storage::disk('public')->delete($fileName);
                        break;
                    }
                }
            }
        }

        // fills others
        $book->Judul = $request['book-name'];
        $book->Penulis = $request['author'];
        $book->Penerbit = $request['publisher'];
        $book->TahunTerbit = $request['publication-year'];
        $book->Sinopsis = $request['synopsis'];

        // saves
        $saveResult = $book->save();

        // uploads photo if not empty
        if(!empty($request['book-cover'])) {
            // gets photo
            $photo = $request['book-cover'];

            // ensure photo file is image
            if(!str_contains($photo->getClientMimeType(), "image")) {
                return [
                    "status" => false,
                    "text" => "File bukan merupakan foto, tipe file: " . $photo->getClientMimeType() . "!",
                ];
            }

            // gets photo attributes
            $fileName = $photo->getClientOriginalName();
            $explode = explode(".", $fileName);
            $extension = end($explode);

            // gets filename
            $fileName = $book->BukuId . "." . $extension;

            // uploads
            $uploadResult = Storage::disk('public')->put($fileName, file_get_contents($photo));

            // handles
            if(!$uploadResult) {
                return response()->json([
                    "status" => false,
                    "text" => "Gagal upload!",
                    "fileName" => $fileName
                ]);
            }

            // sets filename
            $book->filename = $fileName;
            $book->save();
        }

        // handles
        if($saveResult) {
            $isJustCreated = empty($request['id']);

            // save categories
            KategoriBukuReleasi::where('BukuId', $book->BukuId)->delete();
            foreach($request['categories'] as $category) {
                // ensure category exist
                $catExists = !empty(KategoriBuku::where('KategoriId', $category)->first());

                if($catExists) {
                    (new KategoriBukuReleasi([
                        "BukuId" => $book->BukuId,
                        "KategoriId" => $category,
                    ]))->save();
                }
            }

            return response()->json([
                "status" => true,
                "text" => $isJustCreated ? "Berhasil tambah buku!" : "Berhasil ubah buku!",
                "id" => $isJustCreated ? $book->BukuId : null
            ]);
        }
        else {
            return response()->json([
                "status" => false,
                "text" => "Gagal; sesuatu terjadi!"
            ]);
        }
    }

    public function deleteUser($userId) {
        // gets user
        $user = User::where('UserId', $userId)->first();

        // ensure user exists
        if(empty($user)) {
            return response()->json([
                "status" => false,
                "text" => "user tidak ada!"
            ]);
        }

        // ensure this user is not the same with logged user
        if($user->UserId == Auth::user()->UserId) {
            return response()->json([
                "status" => false,
                "text" => "Tidak boleh menghapus user yang sedang login!"
            ]);
        }

        // deletes user
        $deleteResult = $user->delete();
        
        // returns
        if($deleteResult) {
            return response()->json([
                "status" => true,
                "text" => "Berhasil hapus!"
            ]);
        }
        else {
            return response()->json([
                "status" => false,
                "text" => "Gagal hapus; sesuatu terjadi"
            ]);
        }
    }

    public function addNewPetugas(AddNewPetugasRequest $request) {
        // inserts
        $addResult = (new User([
            "Username" => $request["username"],
            "Password" => Hash::make($request["password"]),
            "Email" => "",
            "NamaLengkap" => "",
            "Alamat" => "",
            "Tipe" => "Petugas"
        ]))->save();


        // returns
        return response()->json([
            'status' => true,
            'text' => 'Berhasil!'
        ]);
    }

    public function saveBookCategoryDetails(SaveBookCategoryDetailsRequest $request) {
        // create new book category
        $bookCategory = new KategoriBuku();
        $bookCategory->NamaKategori = $request['category-name'];
        $bookCategory->save();

        // returns
        return response()->json([
            'status' => true,
            'text' => 'Berhasil tambah kategori'
        ]);
    }
}
