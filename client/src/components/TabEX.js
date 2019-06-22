import React from 'react';
import Commits from './Commits';
import Pulls from './Pulls';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import './styles/Tabs.css';
class TabEX extends React.Component {
 render() {
  return (
   <Tabs className='s'>
    <TabList>
     <Tab>Commits</Tab>
     <Tab>Pulls</Tab>
    </TabList>

    <TabPanel>
     <Commits />
    </TabPanel>
    <TabPanel>
     <Pulls />
    </TabPanel>
   </Tabs>
  );
 }
}

export default TabEX;
