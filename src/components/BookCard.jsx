
import React from "react";
import { Link } from "react-router-dom";

function BookCard({ book }) {
  return (
    <div className="card mb-3">
      <div className="card-body">
        <h5 className="card-title">{book.title}</h5>
        <p className="card-text">المؤلف: {book.author}</p>
        <p className="card-text">{book.available ? "متاح" : "غير متاح"}</p>
        <Link to={'/books/${book.id}'} className="btn btn-primary">
          عرض التفاصيل
        </Link>
      </div>
    </div>
  );
}

export default BookCard;

