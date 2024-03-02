<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class AuthSigninRequest extends CustomRequest
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
            "username-or-email" => "required|string",
            "password" => "required|string"
        ];
    }



    public function messages()
    {
        return [
            "username-or-email.required" => "Username atau email diperlukan!",
            "password" => "Password diperlukan!",
        ];
    }
}
