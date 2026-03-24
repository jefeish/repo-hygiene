import React, { useState, useEffect } from 'react';
import { Octicon } from '@primer/react'

import {
  SyncIcon,
  XCircleFillIcon,
  PencilIcon
} from '@primer/octicons-react'

import {
  Box,
  Spinner,
  Button
} from '@primer/react' // Import the Button component

import { Pagehead } from '@primer/react'

/**
 * 
 * @returns 
 */
function HealthChecks() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = () => {
    setLoading(true); // Set loading state to true when fetching again

    // Define the URL of the API endpoint you want to fetch data from
    const apiUrl = 'api/checks';

    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setData(data); // Set the retrieved data in the state
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData(); // Fetch data when the component mounts
  }, []);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Spinner size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <Box sx={{ borderWidth: 1, borderStyle: 'solid', borderColor: 'lightgrey', p: 2, borderRadius: 8, background: '#ffaaaa', marginBottom: 20, paddingLeft: 20, verticalAlign: 'middle' }}>
        <Octicon color="red" icon={XCircleFillIcon} size={32} sx={{ mr: 2, paddingLeft: 20, paddingRight: 20 }} />
        Error: {error.message}
      </Box>
    );
  }

  return (
    <div>
      <div>
        <Pagehead>Registered Health Check Modules</Pagehead>
        {/* Add a Reload Data button */}
        <Button onClick={fetchData} variant="primary" leadingIcon={SyncIcon} sx={{ color: 'white', backgroundColor: 'green', borderRadius: 5, fontWeight: 'bold' }}>
          Reload
        </Button>
        <br />

        <h2>Health Check Modules</h2>
        <ul>
          {data.map((item) => (
            <li
              key={item.id}
              style={{
                border: '1px solid #ccc',
                borderRadius: '8px',
                padding: '10px',
                margin: '5px',
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <h3>{item.name}</h3>
                <p>{item.description}</p>
              </div>
              {/* Add content for the second column here */}
              <Button onClick={fetchData} variant="primary" leadingIcon={PencilIcon} sx={{ color: 'white', backgroundColor: 'green', borderRadius: 8, fontWeight: 'bold', marginLeft: 10 }}>
                Edit
              </Button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default HealthChecks;
