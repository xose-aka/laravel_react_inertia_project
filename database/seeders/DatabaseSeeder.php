<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // \App\Models\User::factory(10)->create();

         \App\Models\User::factory()->create([
             'name' => 'Xose',
             'email' => 'xose@example.com',
             'password' => bcrypt('12345678X_k'),
             'email_verified_at' => time()
         ]);

        \App\Models\Project::factory()->count(30)->hasTasks(30)->create();
    }
}
