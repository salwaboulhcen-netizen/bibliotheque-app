<?php

namespace App\Http\Controllers;
use App\Models\Book;
use Illuminate\Http\Request;

class BookController extends Controller
{
    public function index() {
         return response()->json(Book::all());
    }

    public function show($id) {
        return Book::findOrFail($id);
    }

    public function store(Request $request) {
        $validated = $request->validate([
            'title' => 'required',
            'author' => 'required'
        ]);

        return Book::create($validated);
    }

    public function update(Request $request, $id) {
        $book = Book::findOrFail($id);
        $book->update($request->all());
        return $book;
    }

    public function destroy($id) {
        return Book::destroy($id);
    }
}