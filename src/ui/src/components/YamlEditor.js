import React, { useState, useEffect } from 'react';
import {
    Box,
    Spinner,
    Button
} from '@primer/react' // Import the Button component  


import {
    SyncIcon,
    XCircleFillIcon,
    PencilIcon,
    ChecklistIcon
  } from '@primer/octicons-react'

  
import YAML from 'yaml';

const YamlEditor = ({ initialData }) => {
  const [yamlData, setYamlData] = useState(initialData || '');
    const [error, setError] = useState(null);
    
  useEffect(() => {
    setYamlData(initialData || '');
  }, [initialData]);

    const handleYamlChange = (event) => {
        setError(null); // Clear any previous errors
    setYamlData(event.target.value);
  };

  const handleSave = () => {
    try {
        const parsedData = YAML.parse(yamlData);
        console.log('Parsed YAML Data:', parsedData);
        // Handle saving or using the parsed YAML data as needed
        setError(null); // Clear any previous errors
      } catch (error) {
        console.error('Error parsing YAML:', error.message);
        setError(`Error: ${error.message}`);
      }
    };

  return (
      <div>
 {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}
      <textarea
        value={yamlData}
        onChange={handleYamlChange}
        rows={15}
        style={{ width: '100%' }}
          />
          
      <Button onClick={handleSave} variant="primary" leadingIcon={ChecklistIcon} sx={{ color: 'white', backgroundColor: 'green', borderRadius: 8, fontWeight: 'bold', marginLeft: 10 }}>Save</Button>
    </div>
  );
};

export default YamlEditor;
