
import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function AdminDashboard() {
  const [books, setBooks] = useState([]);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = () => {
    axios.get('http://127.0.0.1:8000/api/books')
      .then(res => setBooks(res.data))
      .catch(err => console.log(err));
  };

  const handleAddBook = (e) => {
    e.preventDefault();
    axios.post('http://127.0.0.1:8000/api/books', { title, author })
      .then(() => {
        setTitle('');
        setAuthor('');
        fetchBooks();
      })
      .catch(err => console.log(err));
  };

  const handleDeleteBook = (id) => {
    axios.delete('http://127.0.0.1:8000/api/books/${id}')
      .then(() => fetchBooks())
      .catch(err => console.log(err));
  };

  return (
    <div className="container mt-4">
      <h2>Admin Dashboard</h2>

      <form onSubmit={handleAddBook}>
        <div className="form-group">
          <label>عنوان الكتاب:</label>
          <input type="text" className="form-control" value={title} onChange={e => setTitle(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>المؤلف:</label>
          <input type="text" className="form-control" value={author} onChange={e => setAuthor(e.target.value)} required />
        </div>
        <button type="submit" className="btn btn-success mt-2">إضافة كتاب</button>
      </form>

      <h3 className="mt-4">جميع الكتب</h3>
      <ul className="list-group">
        {books.map(book => (
          <li className="list-group-item d-flex justify-content-between align-items-center" key={book.id}>
            {book.title} - {book.author}
            <button className="btn btn-danger btn-sm" onClick={() => handleDeleteBook(book.id)}>حذف</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
