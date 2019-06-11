import React from 'react';
import Commit from './Commit';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import './styles/Tabs.css';
class TabEX extends React.Component {
	render() {
		return (
			<Tabs className="s">
				<TabList>
					<Tab>Commits</Tab>
					<Tab>Pulls</Tab>
				</TabList>

				<TabPanel>
					<Commit />
				</TabPanel>
				<TabPanel>
					<h2>Any content 2</h2>
				</TabPanel>
			</Tabs>
		);
	}
}

export default TabEX;
