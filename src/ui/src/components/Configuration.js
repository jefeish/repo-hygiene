import React, { useState } from 'react';
import { Pagehead } from '@primer/react'
import YamlEditor from './YamlEditor.js'
import MyTable from './MyTable.js'

function Configuration() {
  const [yaml, setYaml] = useState(''); // State to store the YAML content


  const initialYamlData = `
  ---
  health_checks:
    - name: "check_repo_clone"
      description: standard repository checks (clone, push, PR)
      type: "repo"
      severity: "critical"
      message: "This is a custom message"
      params:
        repo: "" # required: repository name
        branch: "" # optional: default is "main"
        description: "" 
  
    - name: "check_repo_commit"
      description: standard repository checks (clone, push, PR)
      type: "repo"
      severity: "critical"
      message: "This is a custom message"
      params:
        repo: "" # required: repository name
        branch: "" # optional: default is "main"
        description: "" 
  
    - name: "check_repo_pr"
      description: standard repository checks (clone, push, PR)
      type: "repo"
      severity: "critical"
      message: "This is a custom message"
      params:
        repo: "" # required: repository name
        branch: "" # optional: default is "main"
        description: "" 
  
  reports:
    - name: "issue"
      description: "Markdown report"
      type: "markdown"
      params:
        path: "report.md" # optional: default is "report.md"
    - name: "db"
      description: "JSON report"
      type: "json"
      params:
        path: "report.json" # optional: default is "report.json"
    - name: "csv"
      description: "CSV report"
      type: "csv"
      params:
        path: "report.csv" # optional: default is "report.csv"  
  `;

  return (
    <div>
      <Pagehead>App Configuration</Pagehead>
      <YamlEditor initialData={initialYamlData} />
      {/* <MyTable /> */}
    </div>
  );
}

export default Configuration;