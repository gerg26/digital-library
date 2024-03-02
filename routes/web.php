<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\BookController;
use App\Http\Controllers\LandingController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

// 

// Home
Route::get('/', [LandingController::class, "index"])->name('home');

// Book
Route::get('book/list/{keyword?}', [BookController::class, "books"])->name('book.list');
Route::get('book/details/{bookId}', [BookController::class, "bookDetails"])->name('book.details');

// Not logged in middleware
Route::group(['middleware' => ['not-logged-in']], function() {
    // Auth
    Route::get('auth/sign-in', [AuthController::class, "signIn"])->name('auth.login');
    Route::get('auth/sign-up', [AuthController::class, "signUp"])->name('auth.register');
});

// Logged in middleware
Route::group(['middleware' => ['auth']], function() {
    // Change password
    Route::get('user/change-password', [UserController::class, 'changePassword'])->name('user.change-password');

    // User biasa only middleware
    Route::group(['middleware' => ['biasa']], function() {
        Route::get('book/borrowed-books/', [BookController::class, "borrowedBooks"])->name('book.borrowed-books');
    });

    // Petugas and admin only middleware
    Route::group(['middleware' => ['admin-or-petugas']], function() {
        Route::get('admin/books', [AdminController::class, "books"])->name('admin.books');
        Route::get('admin/book/details/{bookId?}', [AdminController::class, "bookDetails"])->name('admin.bookDetails');
        Route::get('admin/users', [AdminController::class, "users"])->name('admin.users');
        Route::get('admin/book-categories', [AdminController::class, "bookCategories"])->name('admin.bookCategories');
        Route::get('admin/book-category/details', [AdminController::class, "bookCategoryDetails"])->name('admin.bookCategoryDetails');
        Route::get('admin/borrowed-books', [AdminController::class, "borrowedBooks"])->name('admin.borrowedBooks');
    });

    // Admin only middleware
    Route::group(['middleware' => ['admin']], function() {
        Route::get('admin/add-new-petugas', [AdminController::class, "addNewPetugas"])->name('admin.add-new-petugas');
    });
});