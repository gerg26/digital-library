<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class AddNewPetugasRequest extends CustomRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return Auth::user()->Tipe == "Admin";
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            "username" => "required|unique:user,Username",
            "password" => "required",
        ];
    }

    public function messages()
    {
        return [
            "username.unique" => "Username telah dipakai!",
            "username.required" => "Username diperlukan",
            "password.required" => "Password diperlukan",
        ];
    }
}
