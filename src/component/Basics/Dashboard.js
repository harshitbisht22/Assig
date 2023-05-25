import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './dashboard.css'
const Dashboard = () => {
  const [data, setData] = useState([]);
  const [query1, setQuery1] = useState('');
  const [query2, setQuery2] = useState('');
  const [query3, setQuery3] = useState('');
  const [reverseOrder, setReverseOrder] = useState(false);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    applyQueryFilters();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query1, query2, query3, reverseOrder]);
  

  const fetchData = () => {
    fetch('https://reqres.in/api/users')
      .then(response => response.json())
      .then(jsonData => {
        setData(jsonData.data);
        setFilteredData(jsonData.data);
      })
      .catch(error => {
        console.log('Error fetching data:', error);
      });
  };

  const applyQueryFilters = () => {
    let filtered = data.filter(
      item =>
        item.email.toLowerCase().includes(query1.toLowerCase()) &&
        item.first_name.toLowerCase().includes(query2.toLowerCase()) &&
        item.last_name.toLowerCase().includes(query3.toLowerCase())
    );

    if (reverseOrder) {
      filtered = filtered.reverse();
    }

    setFilteredData(filtered);
  };

  const handleQuery1Change = e => {
    setQuery1(e.target.value);
  };

  const handleQuery2Change = e => {
    setQuery2(e.target.value);
  };

  const handleQuery3Change = e => {
    setQuery3(e.target.value);
  };

  const handleReverseOrder = () => {
    setReverseOrder(prevState => !prevState);
  };

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-heading">Dashboard</h1>
      <input
        type="text"
        value={query1}
        onChange={handleQuery1Change}
        placeholder="Search by email..."
        className="dashboard-input"
      />
      <input
        type="text"
        value={query2}
        onChange={handleQuery2Change}
        placeholder="Search by first name..."
        className="dashboard-input"
      />
      <input
        type="text"
        value={query3}
        onChange={handleQuery3Change}
        placeholder="Search by last name..."
        className="dashboard-input"
      />
      <button onClick={handleReverseOrder} className="dashboard-button">
        {reverseOrder ? 'Normal Order' : 'Reverse Order'}
      </button>
      <ul className="dashboard-list">
        {filteredData.map(item => (
          <li key={item.id} className="dashboard-list-item">
            {item.email}
          </li>
        ))}
      </ul>
      <Link to="/home">Go to Home</Link>
    </div>
  );
};

export default Dashboard;
