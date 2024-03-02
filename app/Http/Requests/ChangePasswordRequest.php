<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class ChangePasswordRequest extends CustomRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return !empty(Auth::user());
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'current-password' => 'required',
            'password' => 'required',
            'confirm-password' => 'required|same:password'
        ];
    }

    public function messages()
    {
        return [
            'current-password.required' => 'Password sekarang diperlukan!',
            'password.required' => 'Password diperlukan!',
            'confirm-password.required' => 'Password konfirmasi diperlukan!',
            'confirm-password.same' => 'Password konfirmasi harus sama dengan password!'
        ];
    }
}
