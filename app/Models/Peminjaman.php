<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Peminjaman extends Model
{
    use HasFactory;

    public $table = "peminjaman";
    protected $primaryKey = "PeminjamanId";

    // makes all fields fillable
    protected $guarded = [
        
    ];

    public function book() {
        return $this->belongsTo(Buku::class, 'BukuId', 'BukuId');
    }

    public function borrower() {
        return $this->belongsTo(User::class, 'UserId', 'UserId');
    }
}
