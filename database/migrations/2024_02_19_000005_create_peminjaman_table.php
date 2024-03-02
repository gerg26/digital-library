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
        Schema::create('peminjaman', function (Blueprint $table) {
            $table->id("PeminjamanId");
            $table->foreignId("UserId");
            $table->foreign("UserId")->references("UserId")->on("user");
            $table->foreignId("BukuId");
            $table->foreign("BukuId")->references("BukuId")->on("buku");
            $table->dateTime("TanggalPeminjaman");
            $table->dateTime("TanggalPengembalian");
            $table->enum("StatusPeminjaman", ["Menunggu", "Diterima", "Ditolak"]);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('peminjaman');
    }
};
