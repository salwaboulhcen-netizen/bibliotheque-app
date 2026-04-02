
import React from 'react';

export default function BorrowButton({ book, onBorrow }) {
  return (
    <button
      className="btn btn-success"
      disabled={!book.available}
      onClick={() => onBorrow(book.id)}
    >
      {book.available ? 'استعارة الكتاب' : 'غير متاح'}
    </button>
  );
}
