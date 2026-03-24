import React from 'react';
import {
  Octicon,
  Box
} from '@primer/react'

import {
  CheckIcon,
  CheckCircleFillIcon,
  XCircleFillIcon,
  XIcon,
} from '@primer/octicons-react'

// --------------------------------------------------------
// add some styling to the table
// --------------------------------------------------------
const tableStyle = {
  borderCollapse: 'collapse',
  width: '100%'
};

const colmnStyle = {
  paddingLeft : '18px',
  textAlign: 'left',
  maxWidth: '200px'
};

/**
 * @description
 * @param {*} param0 
 * @returns 
 */
function ReportsList({ data }) {

  console.log('ReportsList: '+ data)

  try {
    return (
      <div>
        <table style={tableStyle}>
          <thead>
            <tr style={{ borderTopLeftRadius: 5,  borderTopRightRadius: 5, border: '1px solid lightgrey', background: '#dddddd', padding: '20px', height: '50px' }}>
              <th style={{ paddingLeft: 20, paddingRight: 20 }}>Status</th>
              <th style={colmnStyle}>Name</th>
              <th style={colmnStyle}>Description</th>
            </tr>
          </thead>
          <tbody>
            {data.reports.map((report, index) => (
              <tr key={index} style={{ borderBottom: '1px solid lightgrey', height: '50px' }}>
                <td style={{ width: '1%', paddingRight: 20}}>
                  {report.status === 'pass' ? (
                    <Octicon icon={CheckCircleFillIcon} size={16} sx={{ color: 'green' }} />
                  ) : (
                    <Octicon icon={XCircleFillIcon} size={16} sx={{ color: 'red' }} />
                  )}
                </td>
                <td style={colmnStyle}>{report.name}</td>
                <td style={colmnStyle}>{report.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  } catch (error) {
    return (
      <Box sx={{ borderWidth: 1, borderStyle: 'solid', borderColor: 'lightgrey', p: 2, borderRadius: 8, background: '#ffaaaa', marginBottom: 20, paddingLeft: 20, verticalAlign: 'middle' }}>
        <Octicon color="red" icon={XCircleFillIcon} size={16} sx={{ mr: 2, paddingLeft: 20, paddingRight: 20 }} />
        Error Rendering Report List: {error.message}
      </Box>
    );
  }
}

export default ReportsList;
