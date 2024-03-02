<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class KategoriBukuReleasi extends Model
{
    use HasFactory;

    public $table = "kategoribuku_relasi";
    protected $primaryKey = "KategoriBukuId";

    // makes all fields fillable
    protected $guarded = [
        
    ];
}
