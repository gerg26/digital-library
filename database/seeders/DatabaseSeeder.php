<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // \App\Models\User::factory(10)->create();

        // \App\Models\User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);
        // insert petugas
        $petugasExists = !empty(DB::table('user')->where('Username', "petugas")->first());
        if(!$petugasExists) {
            DB::table('user')->insert([
                "Username" => "petugas",
                "Password" => Hash::make("mypassword123"),
                "Email" => "petugas@gmail.com",
                "NamaLengkap" => "Petugas",
                "Alamat" => "",
                "Tipe" => "Petugas"
            ]);
        }

        // insert admin
        $adminExists = !empty(DB::table('user')->where('Username', "admin")->first());
        if(!$adminExists) {
            DB::table('user')->insert([
                "Username" => "admin",
                "Password" => Hash::make("admin"),
                "Email" => "admin@gmail.com",
                "NamaLengkap" => "Admin",
                "Alamat" => "",
                "Tipe" => "Admin"
            ]);
        }

        // insert user
        $userExists = !empty(DB::table('user')->where('Username', "user")->first());
        if(!$userExists) {
            DB::table('user')->insert([
                "Username" => "user",
                "Password" => Hash::make("mypassword123"),
                "Email" => "user@gmail.com",
                "NamaLengkap" => "User",
                "Alamat" => "",
                "Tipe" => "Biasa"
            ]);
        }

        // insert kategoribuku
        $kategoriBukuExists = !empty(DB::table('kategoribuku')->where('NamaKategori', 'Fiksi')->first());
        if(!$kategoriBukuExists) {
            DB::table('kategoribuku')->insert([
                "NamaKategori" => 'Fiksi'
            ]);
        }
    }
}
