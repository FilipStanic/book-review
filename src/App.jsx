import { useState, useEffect } from 'react';
import BookPreview from './components/BookPreview';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function App() {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState('');
  const [genreDropdown, setGenreDropdown] = useState('All');

  useEffect(() => {
    fetch('https://api.npoint.io/779d97ded1f52a505689')
      .then((response) => response.json())
      .then(setBooks);
  }, []);

  const genres = Array.from(new Set(books.map(book => book.genre)));

  const filteredBooks = books.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(search.toLowerCase()) ||
      book.author.toLowerCase().includes(search.toLowerCase());
    const matchesGenre = genreDropdown === 'All' || book.genre === genreDropdown;

    return matchesSearch && matchesGenre;
  });

  return (
    <Router>
      <Routes>
        <Route path='/book-preview/:title' element={<BookPreview books={books} />} />
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
                  <Link to={`/book-preview/${encodeURIComponent(book.title)}`}>
                    <button className='mt-4 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded'>
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
