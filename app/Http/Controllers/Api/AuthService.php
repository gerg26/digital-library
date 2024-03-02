<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\AuthSigninRequest;
use App\Http\Requests\AuthSignupRequest;
use App\Models\User;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthService extends Controller
{
    /**
     * Signs up
     */
    public function signUp(AuthSignupRequest $request) {
        // creates new user
        $user = new User([
            "Username" => $request["username"],
            "NamaLengkap" => $request["fullname"],
            "Email" => $request["email"],
            "Password" => Hash::make($request["password"]),
            "Tipe" => "Biasa",
        ]);

        // saves
        $saveResult = $user->save();

        // returns
        if($saveResult) {
            return response()->json([
                "status" => true,
                "text" => "Berhasil register!"
            ]);
        }
        else {
            return response()->json([
                "status" => false,
                "text" => "Gagal register; sesuatu terjadi!"
            ]);
        }
    }

    /**
     * Signs in
     */
    public function signIn(AuthSigninRequest $request) {
        // try signs in
        $authResult = Auth::attempt([
            'Username' => $request["username-or-email"],
            'password' => $request["password"], // why differs with `Password`; reference: https://laracasts.com/discuss/channels/laravel/manual-authentication-not-working
            function (Builder $query) use ($request) {
                // this allows to login with email too
                return $query->orWhere('Email', $request["username-or-email"]);
            },
        ]);

        // handles auth result
        if($authResult) {
            // regenerate sessions
            $request->session()->regenerate();

            // returns
            return response()->json([
                "status" => true,
                "text" => "Berhasil login!",
            ]);
        }
        else {
            // returns
            return response()->json([
                "status" => false,
                "text" => "Gagal login!"
            ]);
        }

        
    }

    /**
     * Signs out
     */
    public function signOut(Request $request) {
        // 
        Auth::guard('web')->logout();

        // 
        $request->session()->invalidate();

        // 
        $request->session()->regenerateToken();

        // redirects
        return response()->redirectToRoute('home');
    }
}
