<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SubmitReviewRequest extends CustomRequest
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
            'review' => 'required',
            'book-id' => 'required|exists:buku,BukuId'
        ];
    }

    public function messages()
    {
        return [
            'review.required' => 'Review diperlukan!',
            'book-id.required' => 'Buku diperlukan!',
            'book-id.exists' => 'Buku tidak ada!'
        ];
    }
}
