<?php

use App\Http\Controllers\Api\AdminService;
use App\Http\Controllers\Api\AuthService;
use App\Http\Controllers\Api\BookService;
use App\Http\Controllers\Api\UserService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Not logged in only middleware
Route::group(["middleware" => ["not-logged-in"]], function() {
    // Authentication
    Route::post('auth/sign-up', [AuthService::class, "signUp"]);
    Route::post('auth/sign-in', [AuthService::class, "signIn"]);
});

// Logged in only middleware
Route::group(['middleware' => ['auth:sanctum']], function() {
    // Sign outs
    Route::get('auth/sign-out', [AuthService::class, "signOut"]);

    // Change password
    Route::post('user/change-password', [UserService::class, 'changePassword']);

    // User biasa only middleware
    Route::group(['middleware' => ['biasa']], function() {
        Route::get('book/borrow-book/{bookId}', [BookService::class, "borrowBook"]);
        Route::get('book/return-book/{bookId}', [BookService::class, "returnBook"]);
    });

    // Admin or petugas middleware
    Route::group(['middleware' => ['admin-or-petugas']], function() {
        Route::post('admin/save-book-details', [AdminService::class, "saveBookDetails"]);
        Route::post('admin/save-book-category-details', [AdminService::class, "saveBookCategoryDetails"]);
    });

    // Admin middleware
    Route::group(['middleware' => ['admin']], function() {
        Route::get('admin/user/delete/{userId}', [AdminService::class, "deleteUser"]);
        Route::post('admin/petugas/add', [AdminService::class, "addNewPetugas"]);
    });
});