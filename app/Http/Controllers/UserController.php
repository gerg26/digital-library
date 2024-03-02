<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class UserController extends Controller
{
    public function changePassword() {
        // gets user
        $user = Auth::user();

        // renders
        return Inertia::render('Home/ChangePasswordPage', [
            "user" => $user
        ]);
    }
}
