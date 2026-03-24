import React, { useState } from 'react';

import {
  SyncIcon,
  XCircleFillIcon,
  PencilIcon,
  SearchIcon,
  ChevronDownIcon,
  ChevronUpIcon
} from '@primer/octicons-react'

import {
  Box,
  Spinner,
  Button,
  Pagehead,
  Octicon
} from '@primer/react' // Import the Button component

function CollapsibleSegment({ title, content }) {
  const [isCollapsed, setCollapsed] = useState(true);

  const toggleCollapse = () => {
    setCollapsed(!isCollapsed);
  };

  return (
    <div>
      <p onClick={toggleCollapse} style={{ marginTop: 0, marginBottom: 1, borderBottom: '1px', borderColor: 'red', paddingLeft: 20,  paddingTop: 10, paddingBottom: 10, textAlign: 'left', background: '#eeeeee'}}>
        {title}
        {isCollapsed ?
          <Octicon icon={ChevronDownIcon} size={16} sx={{ mr: 2, paddingLeft: 10 }} />
          :
          <Octicon icon={ChevronUpIcon} size={16} sx={{ mr: 2, paddingLeft: 10 }} />
        }
      </p>
      {!isCollapsed && (
        <div>
          {content}
        </div>
      )}
    </div>
  );
}

export default CollapsibleSegment;
