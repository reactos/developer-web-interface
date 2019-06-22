import React from 'react';
import Commit from './Commit';
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
     <Commit />
    </TabPanel>
    <TabPanel>
     <Pulls />
    </TabPanel>
   </Tabs>
  );
 }
}

export default TabEX;
