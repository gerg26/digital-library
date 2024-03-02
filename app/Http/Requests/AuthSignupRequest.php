<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;

class AuthSignupRequest extends CustomRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            "fullname" => "required|string",
            "email" => "required|string|unique:user,Email|email:rfc,dns",
            "username" => "required|string|unique:user,Username",
            "password" => "required|string",
            "confirm-password" => "required|string|same:password"
        ];
    }

    public function messages()
    {
        return [
            "fullname.required" => "Nama diperlukan!",
            "email.required" => "Email diperlukan!",
            "email.unique" => "Email telah dipakai!",
            "email.email" => "Format email salah!",
            "username.required" => "Username diperlukan!",
            "username.unique" => "Username telah dipakai!",
            "password.required" => "Password diperlukan!",
            "confirm-password.required" => "Password Konfirmasi diperlukan!",
            "confirm-password.same" => "Password Konfirmasi harus sama dengan password!",
        ];
    }
}
