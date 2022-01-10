import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import './App.css';
import Pagination from './components/Pagination';
import Card from './components/Card';

const App = () => {
  const params = useParams();

  // Get pageNumber from URL
  const pageNumber = parseInt(params.pageNumber) || 1;

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  // intial page value is from params:page extracted in URL -> send to server
  const [page, setPage] = useState(pageNumber);
  const [pages, setPages] = useState(1);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);

      try {
        const res = await fetch(`/api/v1/posts?page=${page}`);

        const { data, pages: totalPages } = await res.json();

        setPages(totalPages);
        setPosts(data);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
        setError('Some error occured!!!');
      }
    };

    fetchPosts();
  }, [page]); // Re-render when page is changed

  return (
    <div className='app'>
      {loading ? (
        <h3 className='loading-text'>Loading...</h3>
      ) : error ? (
        <h3 className='error-text'>{error}</h3>
      ) : (
        <>
          <Pagination page={page} pages={pages} changePage={setPage} />
          <div className='app__posts'>
            {posts.map((post, key) => (
              <Card key={key} post={post} />
            ))}
          </div>
          <Pagination page={page} pages={pages} changePage={setPage} />
        </>
      )}
    </div>
  );
};

export default App;
