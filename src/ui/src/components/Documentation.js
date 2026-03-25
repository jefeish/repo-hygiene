import React, { useState, useEffect } from 'react';
import { Pagehead } from '@primer/react'
import ReactMarkdown from 'react-markdown';
import { Octicon } from '@primer/react'

import {
  XCircleFillIcon
} from '@primer/octicons-react'

import {
  Box,
  Spinner
} from '@primer/react' // Import the Button component

/**
 * @description Component to display the documentation
 * @returns 
 */
function Documentation() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = () => {
    setLoading(true); // Set loading state to true when fetching again

    // Define the URL of the API endpoint you want to fetch data from
    const apiUrl = 'api/docs';

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
      <Box sx={{ borderWidth: 1, borderStyle: 'solid', borderColor: 'lightgrey', p: 2, borderRadius: 5, background: '#ffaaaa', marginBottom: 20, paddingLeft: 20, verticalAlign: 'middle' }}>
        <Octicon color="red" icon={XCircleFillIcon} size={32} sx={{ mr: 2, paddingLeft: 20, paddingRight: 20 }} />
        Error: {error.message}
      </Box>
    );
  }

  return (
    <div>
      <Pagehead>App Documentation</Pagehead>
      <ReactMarkdown>{data}</ReactMarkdown>
    </div>
  );
}

export default Documentation;


