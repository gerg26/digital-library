<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class SaveBookDetailsRequest extends CustomRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return !empty(Auth::user()) && (Auth::user()->Tipe == "Admin" || Auth::user()->Tipe == "Petugas");
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            "book-name"         => "required|string",
            "author"            => "required|string",
            "synopsis"          => "required|string",
            "publisher"         => "required|string",
            "publication-year"  => "required|string",
            "categories"        => "required|array|min:1",
        ];
    }

    public function messages()
    {
        return [
            "book-name.required"        => "Nama buku diperlukan!",
            "author.required"           => "Penulis buku diperlukan!",
            "synopsis.required"         => "Sinopsis diperlukan!",
            "publisher.required"        => "Penerbit diperlukan!",
            "publication-year.required" => "Tahun diperlukan!",
            "categories.required"       => "Kategori diperlukan!",
            "categories.array"          => "Kategori salah; harus array!",
            "categories.min"           => "Harus punya minimal 1 kategori!",
        ];
    }
}
