import React, { useEffect, useState } from 'react';

function Home() {
  const [backendData, setBackendData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBackendData = async () => {
      setLoading(true);
      try {
        const response = await fetch('/api');
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
      
        const result = await response.json();
        setBackendData(result.data);

      } catch (err) {
        setError(err.message);
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBackendData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  
  return (
    <div>
      {backendData.length > 0 ? (
        backendData.map((item, index) => (
          <div key={index}>
            <h1>{` ${item.id} ${item.name}`}</h1>
          </div>
        ))
      ) : (
        <div>No data available</div>
      )}
    </div>
  );
}

export default Home;