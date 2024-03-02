<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\ChangePasswordRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class UserService extends Controller
{
    public function changePassword(ChangePasswordRequest $request) {
        /** @var User */
        $user = Auth::user();

        // checks current password
        $currentPasswordValid = Hash::check($request['current-password'], $user->Password);

        // validates
        if(!$currentPasswordValid) {
            return response()->json([
                'status' => false,
                'text' => 'Password lama salah!'
            ]);
        }

        // changes password
        $user->Password = Hash::make($request['password']);

        // saves
        $user->save();

        // returns
        return response()->json([
            'status' => true,
            'text' => 'Berhasil ganti password!'
        ]);
        
    }
}
