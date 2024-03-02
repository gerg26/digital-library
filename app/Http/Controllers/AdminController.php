<?php

namespace App\Http\Controllers;

use App\Models\Buku;
use App\Models\KategoriBuku;
use App\Models\KategoriBukuReleasi;
use App\Models\Peminjaman;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class AdminController extends Controller
{
    public function books() {
        // gets user
        $user = Auth::user();

        // gets books
        $books = Buku::orderBy('created_at', 'DESC')->get()->map(function($book) {
            if(!empty($book->filename)) {
                $book->cover = Storage::url($book->filename);
            }

            return $book;
        });

        // returns
        return Inertia::render('Admin/BooksPage', [
            "user" => $user,
            "books" => $books
        ]);
    }

    public function bookDetails($bookId = null) {
        // gets user
        $user = Auth::user();

        // gets book categories
        $categories = KategoriBuku::all();

        // gets book and bookcover if book id not null
        $book = null;
        $bookCover = null;
        if($bookId != null) {
            // gets book
            $book = Buku::where('BukuId', $bookId)->first();

            // ensure book not null
            if(empty($book)) {
                return response()->redirectToRoute('admin.books');
            }

            // 
            if(!empty($book->filename)) {
                $bookCover = Storage::url($book->filename);
            }
        }

        // gets selected categories
        $selectedCategories = [];
        if(!empty($book)) {
            $selectedCategories = KategoriBukuReleasi::where('BukuId', $book->BukuId)->get();
        }

        // returns
        return Inertia::render('Admin/BookDetailsPage', [
            "user" => $user,
            "book" => $book,
            "bookCover" => $bookCover,
            "categories" => $categories,
            "selectedCategories" => $selectedCategories
        ]);
    }

    public function users() {
        // gets user
        $user = Auth::user();

        // gets all users
        $users = User::all();

        // returns
        return Inertia::render('Admin/UsersPage', [
            "user" => $user,
            "users" => $users
        ]);
    }

    public function addNewPetugas() {
        // gets user
        $user = Auth::user();

        // renders
        return Inertia::render('Admin/AddNewPetugasPage', [
            "user" => $user
        ]);
    }

    public function bookCategories() {
        // gets user
        $user = Auth::user();

        // gets categories
        $categories = KategoriBuku::all();

        // renders
        return Inertia::render('Admin/BookCategoriesPage', [
            'user' => $user,
            'categories' => $categories,
        ]);
    }

    public function bookCategoryDetails($bookCategoryId = null) {
        // gets user
        $user = Auth::user();

        // returns
        return Inertia::render('Admin/BookCategoryDetailsPage', [
            'user' => $user
        ]);
    }

    public function borrowedBooks() {
        // gets user
        $user = Auth::user();

        // gets borrowed
        $borrowedBooks = Peminjaman::with(['book', 'borrower'])->get();

        // returns
        return Inertia::render('Admin/BorrowedBooksPage', [
            'user' => $user,
            'borrowedBooks' => $borrowedBooks
        ]);
    }
}
