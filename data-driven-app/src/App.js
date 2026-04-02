import React, { useEffect, useState } from "react";

export default function App() {
  // State variables
  const [data, setData] = useState([]);          // API data
  const [filterData, setFilterData] = useState([]); // Filtered data
  const [search, setSearch] = useState("");      // Search input
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null);      // Error state

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/posts"
        );

        const result = await response.json();

        setData(result);
        setFilterData(result);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Handle search
  const handleSearch = (query) => {
    setSearch(query);

    const filtered = data.filter((item) =>
      item.title.toLowerCase().includes(query.toLowerCase())
    );

    setFilterData(filtered);
  };

  // Conditional rendering
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>Data Driven ReactJS Application</h1>

      {/* Search Box */}
      <input
        type="text"
        placeholder="Search..."
        value={search}
        onChange={(e) => handleSearch(e.target.value)}
      />

      {/* Data List */}
      {filterData.length > 0 ? (
        <ul>
          {filterData.map((item) => (
            <li key={item.id}>
              <strong>{item.title}</strong>
              <p>{item.body}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No data found</p>
      )}
    </div>
  );
}