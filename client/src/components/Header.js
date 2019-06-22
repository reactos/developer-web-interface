import React from 'react';
import './styles/Header.css';
import { Collapse, NavbarToggler } from 'reactstrap';

class Header extends React.Component {
 constructor(props) {
  super(props);

  this.toggle = this.toggle.bind(this);
  this.state = {
   isOpen: false
  };
 }
 toggle() {
  this.setState({
   isOpen: !this.state.isOpen
  });
 }
 render() {
  return (
   <div>
    <nav className='navbar navbar-expand-sm bg-dark navbar-dark'>
     <a className='navbar-brand' href='https://www.reactos.org'>
      <img
       src='https://reactos.org/wiki/images/thumb/0/02/ReactOS_logo.png/300px-ReactOS_logo.png'
       alt='logo'
      />
     </a>
     <span>
      <h3>Developer Interface</h3>
     </span>
     <NavbarToggler onClick={this.toggle} />
     <Collapse isOpen={this.state.isOpen} navbar>
      <ul className='navbar-nav ml-auto'>
       <li className='nav-item'>
        <a className='nav-link' href='https://github.com/reactos'>
         <i className='fa fa-github' />
         Github
        </a>
       </li>
       <li className='nav-item'>
        <a className='nav-link' href='https://reactos.org/testman'>
         <i className='fa fa-cog' />
         Testman
        </a>
       </li>
       <li className='nav-item'>
        <a className='nav-link' href='https://build.reactos.org/'>
         <i className='fa fa-wrench' />
         Buildbot
        </a>
       </li>
      </ul>
     </Collapse>
    </nav>
   </div>
  );
 }
}
export default Header;
