<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('kategoribuku_relasi', function (Blueprint $table) {
            $table->id("KategoriBukuId");
            $table->foreignId("BukuId");
            $table->foreign("BukuId")->references("BukuId")->on("buku");
            $table->foreignId("KategoriId");
            $table->foreign("KategoriId")->references("KategoriId")->on("kategoribuku");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('kategoribuku_relasi');
    }
};
