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
        Schema::create('user', function (Blueprint $table) {
            $table->id("UserId");
            $table->string("Username", 255);
            $table->string("Password", 255);
            $table->string("Email", 255);
            $table->string("NamaLengkap", 255);
            $table->string("Alamat", 255)->nullable();
            $table->enum('Tipe', ['Biasa', 'Petugas', 'Admin']);
            $table->string('api_token', 255)
                        ->unique()
                        ->nullable()
                        ->default(null);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists("peminjaman");
        
        Schema::dropIfExists('user');
    }
};
