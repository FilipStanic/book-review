import { useState, useEffect } from 'react';
import BookPreview from './components/BookPreview';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { FaStar } from 'react-icons/fa';

function App() {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState('');
  const [genreDropdown, setGenreDropdown] = useState('All');

  useEffect(() => {
    fetch('https://api.npoint.io/779d97ded1f52a505689')
      .then((response) => response.json())
      .then(data => setBooks(data));
  }, []);

  const genres = Array.from(new Set(books.map(book => book.genre)));

  const filteredBooks = books.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(search.toLowerCase()) ||
      book.author.toLowerCase().includes(search.toLowerCase());
    const matchesGenre = genreDropdown === 'All' || book.genre === genreDropdown;

    return matchesSearch && matchesGenre;
  });

  const getBookRating = (book) => {
    if (!book.reviews.length) return '0.0';
    const ratings = book.reviews.map(review => review.rating);
    const averageRating = ratings.reduce((a, b) => a + b, 0) / ratings.length;
    return averageRating.toFixed(1);
  };

  return (
    <Router>
      <Routes>
        <Route path='/book-preview/:title' element={<BookPreview books={books} setBooks={setBooks} />} />
        <Route path='/' element={
          <div className='text-center mt-4'>
            <h1 className='text-3xl font-bold'>BOOKS</h1>

            <div>
              <input
                type='text'
                placeholder='Search by title or author...'
                value={search}
                onChange={e => setSearch(e.target.value)}
                className='border px-10 py-2 rounded mt-2'
              />
            </div>

            <select
              value={genreDropdown}
              onChange={e => setGenreDropdown(e.target.value)}
              className='border p-2 rounded mt-4'
            >
              <option value='All'>All Genres</option>
              {genres.map((genre, index) => (
                <option key={index} value={genre}>{genre}</option>
              ))}
            </select>

            <div className='grid grid-cols-3 gap-4 p-4'>
              {filteredBooks.map((book, index) => (
                <div key={index} className='bg-white rounded-lg p-4'>
                  <p><strong>Author:</strong> {book.author}</p>
                  <p><strong>Title:</strong> {book.title}</p>
                  <p><strong>Genre:</strong> {book.genre}</p>
                  <strong>Rating: </strong>
                  <p className='italic text-yellow-500 text-2xl'>{getBookRating(book)}</p>
                  <Link to={`/book-preview/${encodeURIComponent(book.title)}`}>
                    <button className='mt-2 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded'>
                      Preview
                    </button>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        } />
      </Routes>
    </Router>
  );
}

export default App;
