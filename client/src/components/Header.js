import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import cn from 'classnames';
import { Collapse, NavbarToggler } from 'reactstrap';

function NavLink({ label, to, activeOnlyWhenExact }) {
  let match = useRouteMatch({
    path: to,
    exact: activeOnlyWhenExact
  });

  return (
    <li className={cn("nav-item", {active: match})}>
      <Link className="nav-link" to={to}>{label}</Link>
    </li>
  );
}

class Header extends React.PureComponent {
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
      <nav className='navbar navbar-expand-sm bg-dark navbar-dark'>
        <span className="navbar-brand">Developer Interface</span>

        <ul className="navbar-nav ml-auto">
          <NavLink to="/commits" label="Commits"/>
          <NavLink to="/pulls" label="Pull Requests"/>
        </ul>

        <NavbarToggler onClick={this.toggle} />

        <Collapse isOpen={this.state.isOpen} navbar>
          <ul className='navbar-nav ml-auto'>
            <li className='nav-item'>
              <a className='nav-link' href='https://github.com/reactos/reactos'>
                <i className='fa fa-github' />{" "}Github
              </a>
            </li>
            <li className='nav-item'>
              <a className='nav-link' href='https://reactos.org/testman'>
                <i className='fa fa-cog' />{" "}Testman
              </a>
            </li>
            <li className='nav-item'>
              <a className='nav-link' href='https://build.reactos.org/'>
                <i className='fa fa-wrench' />{" "}Buildbot
              </a>
            </li>
          </ul>
        </Collapse>
      </nav>
    );
  }
}
export default Header;
