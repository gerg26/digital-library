<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class EnsureNotLoggedIn
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if(!empty(Auth::user())) {
            if($request->expectsJson()) {
                return response()->json([
                    "status" => false,
                    "text" => "Harus tidak login"
                ]);
            }
            else {
                return response()->redirectToRoute('book.list');
            }
        }

        return $next($request);
    }
}
