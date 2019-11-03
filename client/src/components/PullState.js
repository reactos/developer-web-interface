import React from 'react';
import { connect } from 'react-redux';
import {
 Dropdown,
 DropdownToggle,
 DropdownMenu,
 DropdownItem
} from 'reactstrap';
import { currState, loadPulls } from '../redux/actions';
import {PULL_STATE} from '../redux/constants'

class pullState extends React.Component {
 constructor(props) {
  super(props);
  this.state = {
   dropdownOpen: false
  };
 }

 renderPullsState = pullState => {
  return (
   <DropdownItem
    onClick={() => {
     this.props.currState(pullState);
     this.props.loadPulls(1);
    }}
    key={pullState}
   >
    {pullState}
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
  return (
   <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
    <DropdownToggle caret>PR State</DropdownToggle>
    <DropdownMenu
     modifiers={{
      setMaxHeight: {
       enabled: true,
       order: 890,
       fn: this.Stylemodif
      }
     }}
    >
     {Object.values(PULL_STATE).map(this.renderPullsState)}
    </DropdownMenu>
   </Dropdown>
  );
 }
}

const mapStateToProps = ({ pullState }) => ({
 pullState
});

const mapDispatchToProps = dispatch => ({
 loadPulls: next => dispatch(loadPulls(next)),
 currState: pullState => dispatch(currState(pullState))
});

export default connect(
 mapStateToProps,
 mapDispatchToProps
)(pullState);
