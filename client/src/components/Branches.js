import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';
import {
  loadBranches,
  loadCommits,
  loadBuilders
} from '../redux/actions';

class Branches extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dropdownOpen: false
    };
  }
  componentDidMount() {
    this.props.loadBuilders();
    this.props.loadBranches();
  }

  renderBranches = branch => {
    return (
      <DropdownItem key={branch.name}>
        <Link to={`/commits/${branch.name}`}>{branch.name}</Link>
      </DropdownItem>
    );
  };
  toggle = () => {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  };
  Stylemodif = data => {
    return {
      ...data,
      styles: {
        ...data.styles,
        overflow: 'auto',
        maxHeight: 500
      }
    };
  };

  render() {
    const {currentBranch} = this.props;

    return (
      <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
        <DropdownToggle caret><i className='fa fa-code-fork' />{` ${currentBranch}`}</DropdownToggle>
        <DropdownMenu
          modifiers={{
            setMaxHeight: {
              enabled: true,
              order: 890,
              fn: this.Stylemodif
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
  loadCommits: (branch, next) => dispatch(loadCommits(branch, next)),
  loadBranches: () => dispatch(loadBranches()),
  loadBuilders: () => dispatch(loadBuilders())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Branches);
