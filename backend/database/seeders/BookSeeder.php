<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Book;

class BookSeeder extends Seeder
{
 public function run(): void
{
    $books = [
        ['title' => 'Clean Code', 'author' => 'Robert C. Martin', 'genre' => 'informatique'],
        ['title' => 'Sapiens', 'author' => 'Yuval Noah Harari', 'genre' => 'histoire'],
        ['title' => 'The Pragmatic Programmer', 'author' => 'Andrew Hunt', 'genre' => 'informatique'],
        ['title' => 'Atomic Habits', 'author' => 'James Clear', 'genre' => 'economie'],
        ['title' => 'Deep Work', 'author' => 'Cal Newport', 'genre' => 'economie'],
        ['title' => '1984', 'author' => 'George Orwell', 'genre' => 'fiction'],
        ['title' => 'The Hobbit', 'author' => 'J.R.R. Tolkien', 'genre' => 'fiction'],
        ['title' => 'Cosmos', 'author' => 'Carl Sagan', 'genre' => 'science'],
        ['title' => 'Brief History of Time', 'author' => 'Stephen Hawking', 'genre' => 'science'],
        ['title' => 'Les Misérables', 'author' => 'Victor Hugo', 'genre' => 'littérature'],
        ['title' => 'Clean Code', 'author' => 'Robert C. Martin', 'genre' => 'informatique'],
        ['title' => 'Sapiens', 'author' => 'Yuval Noah Harari', 'genre' => 'histoire'],
        ['title' => 'The Pragmatic Programmer', 'author' => 'Andrew Hunt', 'genre' => 'informatique'],
        ['title' => 'Atomic Habits', 'author' => 'James Clear', 'genre' => 'economie'],
        ['title' => 'Deep Work', 'author' => 'Cal Newport', 'genre' => 'economie'],
        ['title' => '1984', 'author' => 'George Orwell', 'genre' => 'fiction'],
        ['title' => 'The Hobbit', 'author' => 'J.R.R. Tolkien', 'genre' => 'fiction'],
        ['title' => 'Cosmos', 'author' => 'Carl Sagan', 'genre' => 'science'],
        ['title' => 'Brief History of Time', 'author' => 'Stephen Hawking', 'genre' => 'science'],
        ['title' => 'Les Misérables', 'author' => 'Victor Hugo', 'genre' => 'littérature'],
        ['title' => 'Clean Code', 'author' => 'Robert C. Martin', 'genre' => 'informatique'],
        ['title' => 'Sapiens', 'author' => 'Yuval Noah Harari', 'genre' => 'histoire'],
        ['title' => 'The Pragmatic Programmer', 'author' => 'Andrew Hunt', 'genre' => 'informatique'],
        ['title' => 'Atomic Habits', 'author' => 'James Clear', 'genre' => 'economie'],
        ['title' => 'Deep Work', 'author' => 'Cal Newport', 'genre' => 'economie'],
        ['title' => '1984', 'author' => 'George Orwell', 'genre' => 'fiction'],
        ['title' => 'The Hobbit', 'author' => 'J.R.R. Tolkien', 'genre' => 'fiction'],
        ['title' => 'Cosmos', 'author' => 'Carl Sagan', 'genre' => 'science'],
        ['title' => 'Brief History of Time', 'author' => 'Stephen Hawking', 'genre' => 'science'],
        ['title' => 'Les Misérables', 'author' => 'Victor Hugo', 'genre' => 'littérature'],
        ['title' => 'Clean Code', 'author' => 'Robert C. Martin', 'genre' => 'informatique'],
        ['title' => 'Sapiens', 'author' => 'Yuval Noah Harari', 'genre' => 'histoire'],
        ['title' => 'The Pragmatic Programmer', 'author' => 'Andrew Hunt', 'genre' => 'informatique'],
        ['title' => 'Atomic Habits', 'author' => 'James Clear', 'genre' => 'economie'],
        ['title' => 'Deep Work', 'author' => 'Cal Newport', 'genre' => 'economie'],
        ['title' => '1984', 'author' => 'George Orwell', 'genre' => 'fiction'],
        ['title' => 'The Hobbit', 'author' => 'J.R.R. Tolkien', 'genre' => 'fiction'],
        ['title' => 'Cosmos', 'author' => 'Carl Sagan', 'genre' => 'science'],
        ['title' => 'Brief History of Time', 'author' => 'Stephen Hawking', 'genre' => 'science'],
        ['title' => 'Les Misérables', 'author' => 'Victor Hugo', 'genre' => 'littérature'],
        ['title' => 'Clean Code', 'author' => 'Robert C. Martin', 'genre' => 'informatique'],
        ['title' => 'Sapiens', 'author' => 'Yuval Noah Harari', 'genre' => 'histoire'],
        ['title' => 'The Pragmatic Programmer', 'author' => 'Andrew Hunt', 'genre' => 'informatique'],
        ['title' => 'Atomic Habits', 'author' => 'James Clear', 'genre' => 'economie'],
        ['title' => 'Deep Work', 'author' => 'Cal Newport', 'genre' => 'economie'],
        ['title' => '1984', 'author' => 'George Orwell', 'genre' => 'fiction'],
        ['title' => 'The Hobbit', 'author' => 'J.R.R. Tolkien', 'genre' => 'fiction'],
        ['title' => 'Cosmos', 'author' => 'Carl Sagan', 'genre' => 'science'],
        ['title' => 'Brief History of Time', 'author' => 'Stephen Hawking', 'genre' => 'science'],
        ['title' => 'Les Misérables', 'author' => 'Victor Hugo', 'genre' => 'littérature'],
        ['title' => 'Clean Code', 'author' => 'Robert C. Martin', 'genre' => 'informatique'],
        ['title' => 'Sapiens', 'author' => 'Yuval Noah Harari', 'genre' => 'histoire'],
        ['title' => 'The Pragmatic Programmer', 'author' => 'Andrew Hunt', 'genre' => 'informatique'],
        ['title' => 'Atomic Habits', 'author' => 'James Clear', 'genre' => 'economie'],
        ['title' => 'Deep Work', 'author' => 'Cal Newport', 'genre' => 'economie'],
        ['title' => '1984', 'author' => 'George Orwell', 'genre' => 'fiction'],
        ['title' => 'The Hobbit', 'author' => 'J.R.R. Tolkien', 'genre' => 'fiction'],
        ['title' => 'Cosmos', 'author' => 'Carl Sagan', 'genre' => 'science'],
        ['title' => 'Brief History of Time', 'author' => 'Stephen Hawking', 'genre' => 'science'],
        ['title' => 'Les Misérables', 'author' => 'Victor Hugo', 'genre' => 'littérature'],
        ['title' => 'Clean Code', 'author' => 'Robert C. Martin', 'genre' => 'informatique'],
        ['title' => 'Sapiens', 'author' => 'Yuval Noah Harari', 'genre' => 'histoire'],
        ['title' => 'The Pragmatic Programmer', 'author' => 'Andrew Hunt', 'genre' => 'informatique'],
        ['title' => 'Atomic Habits', 'author' => 'James Clear', 'genre' => 'economie'],
        ['title' => 'Deep Work', 'author' => 'Cal Newport', 'genre' => 'economie'],
        ['title' => '1984', 'author' => 'George Orwell', 'genre' => 'fiction'],
        ['title' => 'The Hobbit', 'author' => 'J.R.R. Tolkien', 'genre' => 'fiction'],
        ['title' => 'Cosmos', 'author' => 'Carl Sagan', 'genre' => 'science'],
        ['title' => 'Brief History of Time', 'author' => 'Stephen Hawking', 'genre' => 'science'],
        ['title' => 'Les Misérables', 'author' => 'Victor Hugo', 'genre' => 'littérature'],
        ['title' => 'Clean Code', 'author' => 'Robert C. Martin', 'genre' => 'informatique'],
        ['title' => 'Sapiens', 'author' => 'Yuval Noah Harari', 'genre' => 'histoire'],
        ['title' => 'The Pragmatic Programmer', 'author' => 'Andrew Hunt', 'genre' => 'informatique'],
        ['title' => 'Atomic Habits', 'author' => 'James Clear', 'genre' => 'economie'],
        ['title' => 'Deep Work', 'author' => 'Cal Newport', 'genre' => 'economie'],
        ['title' => '1984', 'author' => 'George Orwell', 'genre' => 'fiction'],
        ['title' => 'The Hobbit', 'author' => 'J.R.R. Tolkien', 'genre' => 'fiction'],
        ['title' => 'Cosmos', 'author' => 'Carl Sagan', 'genre' => 'science'],
        ['title' => 'Brief History of Time', 'author' => 'Stephen Hawking', 'genre' => 'science'],
        ['title' => 'Les Misérables', 'author' => 'Victor Hugo', 'genre' => 'littérature'],
          ['title' => '1984', 'author' => 'George Orwell', 'genre' => 'fiction'],
        ['title' => 'The Hobbit', 'author' => 'J.R.R. Tolkien', 'genre' => 'fiction'],
        ['title' => 'Cosmos', 'author' => 'Carl Sagan', 'genre' => 'science'],
        ['title' => 'Brief History of Time', 'author' => 'Stephen Hawking', 'genre' => 'science'],
        ['title' => 'Les Misérables', 'author' => 'Victor Hugo', 'genre' => 'littérature'],
    ];

    // نكررهم حتى نوصلو 75
    $final = [];

    for ($i = 0; $i < 75; $i++) {
        $book = $books[$i % count($books)];
        $final[] = [
            'title' => $book['title'] . ' ' . ($i + 1),
            'author' => $book['author'],
            'genre' => $book['genre'],
            'image' => 'https://picsum.photos/200/300?random=' . $i,
            'available' => rand(0,1),
        ];
    }

    Book::insert($final);
}

private function genre($i)
{
    $genres = ['informatique','science','histoire','littérature','economie','fiction'];
    return $genres[$i % count($genres)];
}
}
