import React from 'react';
import { connect } from 'react-redux';
import {
	Dropdown,
	DropdownToggle,
	DropdownMenu,
	DropdownItem
} from 'reactstrap';
import {
	loadBranches,
	loadCommits,
	currBranch
	// setPages
} from '../redux/actions';

class Branches extends React.Component {
	constructor(props) {
		super(props);

		this.toggle = this.toggle.bind(this);
		this.state = {
			dropdownOpen: false
		};
	}
	componentDidMount() {
		this.props.loadBranches();
	}

	renderBranches = branch => {
		return (
			<DropdownItem
				onClick={() => {
					this.props.currBranch(branch.name);
					this.props.loadCommits(1);
				}}
				key={branch.name}
			>
				{branch.name}
			</DropdownItem>
		);
	};
	toggle() {
		this.setState(prevState => ({
			dropdownOpen: !prevState.dropdownOpen
		}));
	}

	render() {
		return (
			<Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
				<DropdownToggle caret>
					<i className='fa fa-sitemap' />
					Branches
				</DropdownToggle>
				<DropdownMenu
					modifiers={{
						setMaxHeight: {
							enabled: true,
							order: 890,
							fn: data => {
								return {
									...data,
									styles: {
										...data.styles,
										overflow: 'auto',
										maxHeight: 500
									}
								};
							}
						}
					}}
				>
					{this.props.branches.map(this.renderBranches)}
				</DropdownMenu>
			</Dropdown>
		);
	}
}

const mapStateToProps = ({ branches }) => ({
	branches
});

const mapDispatchToProps = dispatch => ({
	loadCommits: next => dispatch(loadCommits(next)),
	loadBranches: () => dispatch(loadBranches()),
	currBranch: branch => dispatch(currBranch(branch))
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Branches);
