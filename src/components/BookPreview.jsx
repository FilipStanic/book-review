import { useParams } from 'react-router-dom';
import { useEffect, useState } from "react";

function BookPreview() {

    const { id } = useParams();
    const [book, setBook] = useState(null);

    useEffect(() => {

        fetch('https://api.npoint.io/779d97ded1f52a505689')
            .then((response) => response.json())
            .then((data) => {
                setBook(data);
            });
    }, [id]);

    return (
        <>
            <div>
                <h2 className="text-3xl font-bold">Book Preview</h2>
                <h2 className='text-2xl font-bold'>{book.title}</h2>
                <p>Author: {book.author}</p>
                <p>Genre: {book.genre}</p>

            </div>
        </>
    );
}

export default BookPreview;