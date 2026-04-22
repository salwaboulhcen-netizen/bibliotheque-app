<?php

namespace Database\Factories;

use App\Models\Book;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Book>
 */
class BookFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title' => fake()->sentence(3),
        'author' => fake()->name(),
        'category' => fake()->randomElement(['informatique','science','fiction','histoire']),
        'image' => fake()->imageUrl(),
        'available' => fake()->boolean(80),
        ];
    }
}
