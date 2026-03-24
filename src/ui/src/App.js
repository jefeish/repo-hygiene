
import './App.css';
import { Header } from '@primer/react'
import { Octicon } from '@primer/react'
import { MarkGithubIcon } from '@primer/octicons-react'
import React, { useState } from 'react';
import MyTabs from './components/MyTabs';

function App() {

  const [selectedTab, setSelectedTab] = useState('tab1');

  const handleTabClick = (tabId) => {
    setSelectedTab(tabId);
  };

  return (
    <div className="App">

      <Header className="Header">
        <Header.Item sx={{ mr: 0, color: "lightgrey", fontSize: "large", fontWeight: "bold" }}>

          <img width="32px" src="images/clean128.png" alt="logo" />
          <div style={{ display: 'inline-block', alignItems: 'center', paddingLeft: 20  }}>
            GitHub Health Check
            </div>
        </Header.Item>
        <Header.Item>
          <Header.Link href="https://github.com" sx={{ fontSize: 20, color: "white" }}>
            GitHub
            <Octicon color="white" icon={MarkGithubIcon} size={32} sx={{ mr: 2, paddingLeft: 20, paddingRight: 20 }} />
          </Header.Link>
        </Header.Item>
      </Header>

      <main className="main">
        {/* Main content goes here */}
        <MyTabs />
        {/* <MyUnderlineNav /> */}
      </main>

      <footer>
        {/* Footer content goes here */}
        <Octicon color="grey" icon={MarkGithubIcon} size={24} sx={{ mr: 2, }} />
        &copy; 2023 GitHub Inc.
      </footer>
      
    </div>
  )
}

export default App;
