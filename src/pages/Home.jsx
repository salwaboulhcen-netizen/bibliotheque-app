
import React from "react";
import BookCard from "../components/BookCard";

// بيانات وهمية باش الصفحة تبان عامرة
const books = [
  { id: 1, title: "React Basics", author: "Salwa", available: true },
  { id: 2, title: "Laravel Guide", author: "Salwa", available: false },
  { id: 3, title: "JavaScript Advanced", author: "Salwa", available: true },
];

function Home() {
  return (
    <div className="container mt-4">
      <div className="row">
        {books.map((book) => (
          <div className="col-md-4" key={book.id}>
            <BookCard book={book} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
