<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\ValidationException;

class CustomRequest extends FormRequest
{
    protected function failedValidation(Validator $validator)
    {
        // gets error text
        $errors = $validator->errors()->toArray();
        $errorText = "";
        foreach($errors as $item) {
            $errorText = $errorText . $item[0] . "<br>";
        }

        // throws
        throw new ValidationException($validator, response()->json([
            "status" => false,
            "text" => $errorText
        ]));
    }
}
