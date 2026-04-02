import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import BookCard from '../components/BookCard';
function BookDetail() {
  const { id } = useParams(); // جبدنا ID ديال الكتاب من URL
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // دابا غادي نستعمل Mock data حتى تربطي Laravel API
    const fetchBook = async () => {
      try {
        // إذا كان Laravel API جاهز:
        // const response = await axios.get(`http://localhost:8000/api/books/${id}`);
        // setBook(response.data);

        // Mock data مؤقتة:
        const mockBooks = [
          { id: 1, title: 'الكتاب الأول', author: 'المؤلف أ', category: 'أدب', description: 'وصف الكتاب الأول', available: true },
          { id: 2, title: 'الكتاب الثاني', author: 'المؤلف ب', category: 'علوم', description: 'وصف الكتاب الثاني', available: false },
        ];

        const foundBook = mockBooks.find(b => b.id === parseInt(id));
        setBook(foundBook || null);
      } catch (err) {
        setError('خطأ في جلب بيانات الكتاب');
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  if (loading) return <div className="container mt-5"><h3>جار التحميل...</h3></div>;
  if (error) return <div className="container mt-5"><h3>{error}</h3></div>;
  if (!book) return <div className="container mt-5"><h3>الكتاب غير موجود</h3></div>;

  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-body">
          <h3 className="card-title">{book.title}</h3>
          <p className="card-text"><strong>المؤلف:</strong> {book.author}</p>
          <p className="card-text"><strong>التصنيف:</strong> {book.category}</p>
          <p className="card-text">{book.description}</p>
          <p className="card-text">{book.available ? 'متاح للاستعارة' : 'غير متاح'}</p>
        </div>
      </div>
    </div>
  );
}

export default BookDetail;