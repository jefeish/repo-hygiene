import React, { useState, useEffect } from 'react'
import ReportsList from './ReportsList'
import CollapsibleSegment from './CollapsibleSegment'

import {
  SyncIcon,
  CheckCircleFillIcon,
  XCircleFillIcon,
  PencilIcon
} from '@primer/octicons-react'

import {
  Box,
  Spinner,
  Button,
  Pagehead,
  Octicon
} from '@primer/react' // Import the Button component

const util = require('util')

function Home() {
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
        console.log('data: ' + data)
        console.log('data inspect: ' + util.inspect(data))
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

  const jsonData = [{
    report: 'Nov. 12 2023 - 12:45 am',
    checks: [
      {
        name: 'CHECK REPO CLONE',
        description: 'Check if the repo can be cloned, in a timely manner',
        result: 'Cloning the Repo was successful',
        status: 'pass',
      },
      {
        name: 'CHECK REPO COMMIT',
        description: 'Check if the repo can be committed to, in a timely manner',
        result: 'Creating a commit was successful',
        status: 'pass',
      },
      {
        name: 'CHECK REPO PR',
        description: 'Check if the repo can process a PR',
        result: 'Creating a PR has failed, with the following issue: "The PR is not valid"',
        status: 'fail',
      },
    ],
  },
  {
    report: 'Sep. 13 2023 - 12:45 am',
    checks: [
      {
        name: 'CHECK REPO CLONE',
        description: 'Check if the repo can be cloned, in a timely manner',
        result: 'Cloning the Repo was successful',
        status: 'pass',
      },
      {
        name: 'CHECK REPO COMMIT',
        description: 'Check if the repo can be committed to, in a timely manner',
        result: 'Creating a commit was successful',
        status: 'fail',
      },
      {
        name: 'CHECK REPO PR',
        description: 'Check if the repo can process a PR',
        result: 'Creating a PR has failed, with the following issue: "The PR is not valid"',
        status: 'pass',
      },
    ],
  },
  {
    report: 'Sep. 13 2023 - 12:45 am',
    checks: [
      {
        name: 'CHECK REPO CLONE',
        description: 'Check if the repo can be cloned, in a timely manner',
        result: 'Cloning the Repo was successful',
        status: 'pass',
      },
      {
        name: 'CHECK REPO COMMIT',
        description: 'Check if the repo can be committed to, in a timely manner',
        result: 'Creating a commit was successful',
        status: 'fail',
      },
      {
        name: 'CHECK REPO PR',
        description: 'Check if the repo can process a PR',
        result: 'Creating a PR has failed, with the following issue: "The PR is not valid"',
        status: 'pass',
      },
    ],
  },
  {
    report: 'Sep. 13 2023 - 12:45 am',
    checks: [
      {
        name: 'CHECK REPO CLONE',
        description: 'Check if the repo can be cloned, in a timely manner',
        result: 'Cloning the Repo was successful',
        status: 'pass',
      },
      {
        name: 'CHECK REPO COMMIT',
        description: 'Check if the repo can be committed to, in a timely manner',
        result: 'Creating a commit was successful',
        status: 'fail',
      },
      {
        name: 'CHECK REPO PR',
        description: 'Check if the repo can process a PR',
        result: 'Creating a PR has failed, with the following issue: "The PR is not valid"',
        status: 'pass',
      },
    ],
  },
  {
    report: 'Sep. 13 2023 - 12:45 am',
    checks: [
      {
        name: 'CHECK REPO CLONE',
        description: 'Check if the repo can be cloned, in a timely manner',
        result: 'Cloning the Repo was successful',
        status: 'pass',
      },
      {
        name: 'CHECK REPO COMMIT',
        description: 'Check if the repo can be committed to, in a timely manner',
        result: 'Creating a commit was successful',
        status: 'fail',
      },
      {
        name: 'CHECK REPO PR',
        description: 'Check if the repo can process a PR',
        result: 'Creating a PR has failed, with the following issue: "The PR is not valid"',
        status: 'pass',
      },
    ],
  }
  ];

  const tableStyle = {
    borderCollapse: 'collapse',
    width: '100%'
  };

  const colmnStyle = {
    paddingLeft: '18px',
    textAlign: 'left',
    maxWidth: '200px'
  };

  const ReportItem = ({ report, checks }) => (

    <div key={report}>
      <table style={tableStyle}>
        <thead>
          <tr style={{ border: '1px solid lightgrey', padding: '20px', height: '40px' }}>
            <th style={{ paddingLeft: 20, paddingRight: 20 }}>Status</th>
            <th style={colmnStyle}>Check Name</th>
            <th style={colmnStyle}>Description</th>
            <th style={colmnStyle}>Result</th>
          </tr>
        </thead>
        <tbody>
          {checks.map((check, index) => (
            <tr key={index} style={{ borderBottom: '1px solid lightgrey', height: '40px' }}>
              <td style={{ paddingRight: 20, paddingLeft: 20 }}>
                {report.status === 'pass' ? (
                  <Octicon icon={CheckCircleFillIcon} size={16} sx={{ color: 'green', paddingLeft: 20 }} />
                ) : (
                  <Octicon icon={XCircleFillIcon} size={16} sx={{ color: 'red', paddingLeft: 20 }} />
                )}
              </td>
              <td style={colmnStyle}>{check.name}</td>
              <td style={colmnStyle}>{check.description}</td>
              <td style={colmnStyle}>{check.result}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const ReportsList = ({ data }) => (
    <div>
      {data.map((item, index) => (
        <div key={index}>
          <ReportItem report={item.report} checks={item.checks} />
        </div>
      ))}
    </div>
  );
  return (
    <div>
      <Pagehead>
        <img src="logo-192.png" style={{ display: 'inline-block', verticalAlign: 'middle', width: '32px', paddingRight: '20px' }} />
        Reports
      </Pagehead>
      <Box
        sx={{
          borderWidth: 1,
          borderStyle: 'solid',
          borderColor: 'lightgrey',
          p: 2,
          borderRadius: 8,
          background: '#ffffff',
          marginBottom: 20,
          verticalAlign: 'left',
          padding: 0
        }}
      >
        <div style={{ textAlign: 'left', borderBottom: '1px', borderColor: 'lightgrey' }}>
          {jsonData.map((item, index) => (

            <CollapsibleSegment title={item.report} content={<ReportItem report={item.report} checks={item.checks} />} />

          ))}
        </div>
      </Box>
    </div>
  )
}

export default Home;