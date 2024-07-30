import { useState, useEffect } from 'react';
import BookPreview from './components/BookPreview';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"

function App() {

  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch('https://api.npoint.io/779d97ded1f52a505689')
      .then((response) => response.json())
      .then((data) => {
        setBooks(data);
      });
  }, []);


  return (
    <>
      <Router>

        <Routes>
          <Route path='/book-preview/:id' element={<BookPreview />} />
          <Route path='/'
            element={
              <div>
                <div className='text-center mt-4'>
                  <h1 className='text-3xl font-bold'>BOOKS</h1>
                  <div className='grid grid-cols-4'>
                    {books.map((book, index) => (
                      <div key={index} className='border border-gray-500 m-4 p-2'>
                        <p>Author: {book.author}</p>
                        <p>Title: {book.title}</p>
                        <p>Genre: {book.genre}</p>
                        <Link to={`/book-preview/${book.id}`}>
                          <button className='border mt-4 border-black bg-green-600 text-white p-2'>
                            Preview
                          </button>
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            }
          />
        </Routes>

      </Router>
    </>
  )
}

export default App
