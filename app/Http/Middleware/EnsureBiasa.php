<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class EnsureBiasa
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if(Auth::user()->Tipe == "Biasa") {
            return $next($request);   
        }

        return response()->json([
            "status" => false,
            "tipe" => Auth::user()->Tipe,
            "text" => "Anda harus user biasa untuk mengkases resource ini!"
        ]);
    }
}
