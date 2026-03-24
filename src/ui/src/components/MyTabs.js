import React, { useState } from 'react';

import { Octicon } from '@primer/react'
import { HomeIcon, FileIcon, HeartIcon, GearIcon, MarkGithubIcon } from '@primer/octicons-react'

import Home from './Home';
import HealthChecks from './HealthChecks';
import Configuration from './Configuration';
import Documentation from './Documentation';
import './MyTabs.css';


function MyTabs() {
    const [selectedTab, setSelectedTab] = useState('tab1');

    const handleTabClick = (tabId) => {
        setSelectedTab(tabId);
    };
    
    return (
        <div>
            <div className="tab-container">
                <Tab className="tab" tabId="tab1" selectedTab={selectedTab} onTabClick={handleTabClick}>
                    <p>
                        <Octicon color="grey" icon={HomeIcon} size={16} sx={{ mr: 2, paddingLeft: 10 }} />
                        Home
                    </p>
                </Tab>
                <Tab className="tab" tabId="tab2" selectedTab={selectedTab} onTabClick={handleTabClick}>
                    <p>
                        <Octicon color="grey" icon={HeartIcon} size={16} sx={{ mr: 2, paddingLeft: 10 }} />
                        Health Checks
                    </p>
                </Tab>
                <Tab className="tab" tabId="tab3" selectedTab={selectedTab} onTabClick={handleTabClick}>
                    <p>
                        <Octicon color="grey" icon={GearIcon} size={16} sx={{ mr: 2, paddingLeft: 10 }} />
                        Configuration
                    </p>
                </Tab>
                <Tab className="tab" tabId="tab4" selectedTab={selectedTab} onTabClick={handleTabClick}>
                    <p>
                        <Octicon color="grey" icon={FileIcon} size={16} sx={{ mr: 2, paddingLeft: 10 }} />
                        Documentation
                    </p>
                </Tab>
            </div>
            <div className="tab-content">
                <TabContent tabId="tab1" selectedTab={selectedTab}>
                    <Home />
                </TabContent>
                <TabContent tabId="tab2" selectedTab={selectedTab}>
                    <HealthChecks />
                </TabContent>
                <TabContent tabId="tab3" selectedTab={selectedTab}>
                    <Configuration />
                </TabContent>
                <TabContent tabId="tab4" selectedTab={selectedTab}>
                    <Documentation />
                </TabContent>
            </div>
        </div>
    );
}

function Tab({ tabId, selectedTab, onTabClick, children }) {
    return (
        <div
            className={`tab ${tabId === selectedTab ? 'selected' : ''}`}
            onClick={() => onTabClick(tabId)}
        >
            {children}
        </div>
    );
}

function TabContent({ tabId, selectedTab, children }) {
    return (
        <div style={{ display: tabId === selectedTab ? 'block' : 'none' }}>
            {children}
        </div>
    );
}

export default MyTabs;
