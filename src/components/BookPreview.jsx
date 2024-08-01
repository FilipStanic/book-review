import { BrowserRouter as Router, Routes, Route, Link, useParams } from "react-router-dom";


function BookPreview({ books}) {
    const { title } = useParams();
    const decodedTitle = decodeURIComponent(title);
    const book = books.find(b => b.title === decodedTitle);

    const getBookRating = (book) => {
        const ratings = book.reviews.map(review => review.rating);
        const averageRating = ratings.reduce((a, b) => a + b, 0) / ratings.length;
        return averageRating.toFixed(1);
      };


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
            <div className='flex justify-center items-center h-screen'>
                <div className='text-center w-1/2 p-4'>
                    <h2 className="text-3xl font-bold mb-4">Book Preview</h2>
                    <div className='rounded-lg bg-white p-6'>
                        <h2 className='text-2xl font-bold'>{book?.title}</h2>
                        <p className='mt-2'><strong>Author:</strong> {book?.author}</p>
                        <p className='mt-2'><strong>Genre:</strong> {book?.genre}</p>
                        <p className='mt-4 italic'>{book?.summary}</p>
                        <p className='mt-4'><strong>Release Date:</strong> {book?.release_date}</p>
                        <strong>Rating: </strong><p className='italic text-yellow-500 text-2xl'>{getBookRating(book)}</p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default BookPreview;
