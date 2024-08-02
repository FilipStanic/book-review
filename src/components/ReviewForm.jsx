import { useState } from 'react';
import { FaStar } from 'react-icons/fa';

function ReviewForm({ book, onAddReview }) {
  const [user, setUser] = useState('');
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newReview = {
      user,
      review,
      rating: Number(rating),
    };
    onAddReview(book.title, newReview);
    setUser('');
    setReview('');
    setRating(0);
  };

  return (
    <form onSubmit={handleSubmit} className='mt-6 bg-gray-100 p-6 rounded-lg shadow-lg'>
      <h3 className="text-2xl font-bold mb-4">Add a Review</h3>
      <div className='mb-4'>
        <label className='block text-left'>Name:</label>
        <input
          type='text'
          value={user}
          onChange={e => setUser(e.target.value)}
          required
          className='border px-2 py-1 rounded w-full'
        />
      </div>
      <div className='mb-4'>
        <label className='block text-left'>Review:</label>
        <textarea
          value={review}
          onChange={e => setReview(e.target.value)}
          required
          className='border px-2 py-1 rounded w-full'
        />
      </div>
      <div className='mb-4'>
        <label className='block text-left'>Rating:</label>
        <div className='flex'>
          {[...Array(5)].map((star, index) => {
            const ratingValue = index + 1;
            return (
              <label key={index}>
                <input
                  type='radio'
                  name='rating'
                  value={ratingValue}
                  onClick={() => setRating(ratingValue)}
                  className='hidden'
                />
                <FaStar
                  size={24}
                  color={ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
                  className='cursor-pointer'
                  onMouseEnter={() => setHover(ratingValue)}
                  onMouseLeave={() => setHover(null)}
                />
              </label>
            );
          })}
        </div>
      </div>
      <button type='submit' className='bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded'>
        Submit
      </button>
    </form>
  );
}

export default ReviewForm;
