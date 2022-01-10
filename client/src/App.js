import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const App = () => {
  const params = useParams();

  // Get pageNumber from URL
  const pageNumber = params.pageNumber || 1;

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

  return <div>App</div>;
};

export default App;
