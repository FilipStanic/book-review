import { BrowserRouter as Router, Routes, Route, Link, useParams } from "react-router-dom";
import ReviewForm from './ReviewForm';
import { useState, useEffect } from 'react';
import { FaStar } from 'react-icons/fa';

function BookPreview({ books }) {
  const { title } = useParams();
  const decodedTitle = decodeURIComponent(title);
  const book = books.find(b => b.title === decodedTitle);
  const [bookReviews, setBookReviews] = useState(book ? book.reviews : []);

  const getBookRating = () => {
    if (bookReviews.length === 0) return '0.0';
    const ratings = bookReviews.map(review => review.rating);
    const averageRating = ratings.reduce((a, b) => a + b, 0) / ratings.length;
    return averageRating.toFixed(1);
  };

  const handleAddReview = (bookTitle, newReview) => {
    if (book.title === bookTitle) {
      const updatedReviews = [...bookReviews, newReview];
      setBookReviews(updatedReviews);
      book.reviews = updatedReviews;
    }
  };

  useEffect(() => {
    setBookReviews(book ? book.reviews : []);
  }, [book]);

  return (
    <>
      <div className="absolute left-3 top-3">
        <Link to="/">
          <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-arrow-left" width="44" height="44" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#ffffff" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M5 12l14 0" />
            <path d="M5 12l6 6" />
            <path d="M5 12l6 -6" />
          </svg>
        </Link>
      </div>
      <div className='flex justify-center items-center h-full overflow-auto pt-4'>
        <div className='text-center w-full md:w-1/2 p-4'>
          <h2 className="text-3xl font-bold mb-4">Book Preview</h2>
          <div className='rounded-lg bg-white p-6'>
            <h2 className='text-2xl font-bold'>{book?.title}</h2>
            <p className='mt-2'><strong>Author:</strong> {book?.author}</p>
            <p className='mt-2'><strong>Genre:</strong> {book?.genre}</p>
            <p className='mt-4 italic'>{book?.summary}</p>
            <p className='mt-4'><strong>Release Date:</strong> {book?.release_date}</p>
            <strong>Rating: </strong>
            <p className='italic text-yellow-500 text-2xl'>{getBookRating()}</p>

            <div className='mt-6'>
              <h3 className="text-2xl font-bold mb-4">Reviews</h3>
              {bookReviews.map((review, index) => (
                <div key={index} className='border-t border-gray-300 pt-2 mt-2'>
                  <p><strong>{review.user}:</strong> {review.review}</p>
                  <p><strong>Rating:</strong> {review.rating}</p>
                  <div className='flex'>
                    {[...Array(5)].map((star, i) => {
                      const ratingValue = i + 1;
                      return (
                        <FaStar
                          key={i}
                          size={24}
                          color={ratingValue <= review.rating ? "#ffc107" : "#e4e5e9"}
                        />
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            <ReviewForm book={book} onAddReview={handleAddReview} />
          </div>
        </div>
      </div>
    </>
  );
}

export default BookPreview;
